# Generated by Django 4.2.1 on 2023-06-03 18:25

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('financiationAPI', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraccount',
            name='profile_picture',
            field=models.ImageField(default=None, upload_to='financiationAPI/images/profile_pictures/'),
        ),
    ]