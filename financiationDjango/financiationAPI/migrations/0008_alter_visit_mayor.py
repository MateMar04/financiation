# Generated by Django 4.2.1 on 2023-09-08 14:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("financiationAPI", "0007_alter_mayoremail_mayor_alter_mayorphone_mayor"),
    ]

    operations = [
        migrations.AlterField(
            model_name="visit",
            name="mayor",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="financiationAPI.mayor",
            ),
        ),
    ]
