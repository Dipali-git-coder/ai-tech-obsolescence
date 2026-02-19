from django.core.management.base import BaseCommand
from django.conf import settings
import pandas as pd
import os
import ast
from collections import Counter

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

        df = pd.read_csv(file_path)

        # ✅ Count skills once
        skill_counter = Counter()

        for _, row in df.iterrows():
            # Convert skills column to string & split
            raw_skills = row["skills"]

            try:
                skills = ast.literal_eval(raw_skills)  # ['Python', 'AI', 'SQL']
            except Exception:
                skills = []
            
            for skill_name in skills:
                # 🔧 CLEANING LOGIC (ADDED HERE)
                skill_name = skill_name.lower().strip()
                skill_name = skill_name.replace("[", "").replace("]", "").replace("'", "")

                if skill_name:
                    skill_counter[skill_name] += 1

        # Assume same year/month for dataset
        year = int(df.iloc[0]["year"])
        month = int(df.iloc[0]["month"])

        for skill_name, count in skill_counter.items():
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

        self.stdout.write(
            self.style.SUCCESS("✅ Skill trend data loaded successfully")
        )
