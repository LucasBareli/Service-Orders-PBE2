# Generated by Django 5.1.7 on 2025-04-07 18:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_ambientes_gestores_remove_ordemservico_abertura_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historico',
            name='data_encerramento',
            field=models.DateTimeField(),
        ),
    ]
