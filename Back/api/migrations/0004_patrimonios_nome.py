# Generated by Django 5.1.7 on 2025-04-14 19:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_historico_data_encerramento'),
    ]

    operations = [
        migrations.AddField(
            model_name='patrimonios',
            name='nome',
            field=models.CharField(default=None, max_length=100),
        ),
    ]
