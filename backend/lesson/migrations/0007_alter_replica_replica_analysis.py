# Generated by Django 5.0.3 on 2024-06-08 14:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lesson', '0006_alter_dialogue_replicas'),
    ]

    operations = [
        migrations.AlterField(
            model_name='replica',
            name='replica_analysis',
            field=models.ManyToManyField(blank=True, related_name='replicas', to='lesson.wordanalysis'),
        ),
    ]