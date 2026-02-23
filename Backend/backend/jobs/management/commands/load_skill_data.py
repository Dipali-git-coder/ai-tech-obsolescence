from django.core.management.base import BaseCommand
from django.conf import settings
from django.db.models import Sum
import pandas as pd
import os
import ast
from collections import defaultdict, Counter

from jobs.models import Skill, SkillTrend


class Command(BaseCommand):
    help = "Load skill trend data from CSV"

    def handle(self, *args, **kwargs):

        file_path = os.path.join(
            settings.BASE_DIR.parent,
            "data",
            "processed",
            "adzuna_jobs_clean_base.csv"
        )

        if not os.path.exists(file_path):
            self.stdout.write(self.style.ERROR("❌ CSV file not found"))
            return

        df = pd.read_csv(file_path)

        # 🔥 Year-wise & Month-wise Skill Counter
        yearly_skill_counter = defaultdict(lambda: Counter())

        for _, row in df.iterrows():

            raw_skills = row.get("skills", "")
            year = int(row.get("year", 0))
            month = int(row.get("month", 1))

            if year == 0:
                continue

            try:
                skills = ast.literal_eval(raw_skills)
            except Exception:
                skills = []

            for skill_name in skills:
                skill_name = skill_name.lower().strip()

                if skill_name:
                    yearly_skill_counter[(year, month)][skill_name] += 1

        total_created = 0

        # 🔥 Save into Skill & SkillTrend
        for (year, month), counter in yearly_skill_counter.items():
            for skill_name, count in counter.items():

                skill, _ = Skill.objects.get_or_create(
                    name=skill_name,
                    defaults={"demand_score": 0.0}
                )

                SkillTrend.objects.update_or_create(
                    skill=skill,
                    year=year,
                    month=month,
                    defaults={"count": count}
                )

                total_created += 1

        # 🔥 Update demand_score for each skill (Total Count Across Years)
        for skill in Skill.objects.all():
            total = SkillTrend.objects.filter(skill=skill).aggregate(
                total_count=Sum("count")
            )["total_count"]

            skill.demand_score = total if total else 0
            skill.save()

        self.stdout.write(
            self.style.SUCCESS(
                f"✅ Skill trend data loaded successfully ({total_created} records processed)"
            )
        )