# Generated by Django 4.2.1 on 2023-08-13 18:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('financiationAPI', '0011_data_load'),
    ]

    operations = [
        migrations.AlterField(
            model_name='visit',
            name='accommodation',
            field=models.BooleanField(),
        ),
        migrations.AlterField(
            model_name='visit',
            name='civil_registration',
            field=models.BooleanField(),
        ),
        migrations.AlterField(
            model_name='visit',
            name='modernization_fund',
            field=models.BooleanField(),
        ),
    ]