# Generated by Django 4.2 on 2023-04-13 13:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('djangoapp', '0002_asesorados_asesores_consultas_convenios_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='EmailsIntendentes',
            fields=[
                ('id', models.AutoField(db_column='ID', primary_key=True, serialize=False)),
                ('mail', models.CharField(db_column='MAIL', max_length=100)),
            ],
            options={
                'db_table': 'emails_intendentes',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='EstadoDeConsulta',
            fields=[
                ('id', models.AutoField(db_column='ID', primary_key=True, serialize=False)),
                ('nombre', models.CharField(db_column='NOMBRE', max_length=30)),
                ('descripcion', models.TextField(blank=True, db_column='DESCRIPCION', null=True)),
            ],
            options={
                'db_table': 'estado_de_consulta',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='TelefonosIntendentes',
            fields=[
                ('id', models.AutoField(db_column='ID', primary_key=True, serialize=False)),
                ('telefono', models.BigIntegerField(db_column='TELEFONO')),
            ],
            options={
                'db_table': 'telefonos_intendentes',
                'managed': False,
            },
        ),
    ]
