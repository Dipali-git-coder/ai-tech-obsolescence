from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from users.models import UserProfile
from recommendations.views import recommend_skills

import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(
    api_key = os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

class CareerCoach(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:

            profile = UserProfile.objects.get(
                user=request.user
            )

            user_input = request.data.get(
                "user_input",
                ""
            )

            skills = [
                skill.strip()
                for skill in profile.skills.split(",")
                if skill.strip()
            ]

            role = profile.profession

            result = recommend_skills(
                user_skills=skills,
                target_role=role
            )

            recommended = result.get(
                "recommended_skills",
                []
            )

            prompt = f"""
                You are an expert AI Career Coach.

                Current Role:
                {role}

                Current Skills:
                {', '.join(skills)}

                Recommended Skills:
                {', '.join(recommended)}

                Question:
                {user_input}

                Return the response in the following format:

                Profile Analysis:
                <analysis>

                Skill Gaps:
                <gaps>

                Why These Skills Matter:
                <explanation>

                Learning Roadmap:
                <roadmap>

                Career Opportunities:
                <opportunities>

                Rules:
                - Keep response under 150 words.
                - Use plain text only.
                - No markdown.
                - Put a blank line between each section.
                - Write each section in 2-3 concise sentences.
            """

            gemini_response = model.generate_content(prompt)

            response_text = gemini_response.text

            response_text = response_text.replace(
                "Skill Gaps:",
                "Skill Gaps:"
            )

            response_text = response_text.replace(
                "Why These Skills Matter:",
                "Why These Skills Matter:"
            )

            response_text = response_text.replace(
                "Learning Roadmap:",
                "Learning Roadmap:"
            )

            response_text = response_text.replace(
                "Career Opportunities:",
                "Career Opportunities:"
            )

            return Response({
                "user_question": user_input,
                "recommended_skills": recommended,
                "response": response_text
            })

        except UserProfile.DoesNotExist:
            return Response(
                {
                    "error": "User profile not found."
                },
                status=404
            )

        except Exception as e:
            return Response(
                {
                    "error": str(e)
                },
                status=500
            )