# Generated by Django 5.0.3 on 2024-06-08 17:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lesson', '0008_remove_replica_replica_analysis_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='dialogue',
            options={'ordering': ['id']},
        ),
        migrations.AlterModelOptions(
            name='exercise',
            options={'ordering': ['id']},
        ),
        migrations.AlterModelOptions(
            name='lesson',
            options={'ordering': ['id']},
        ),
        migrations.AlterModelOptions(
            name='replica',
            options={'ordering': ['id']},
        ),
        migrations.AlterModelOptions(
            name='section',
            options={'ordering': ['id']},
        ),
        migrations.AlterModelOptions(
            name='suggested',
            options={'ordering': ['id']},
        ),
        migrations.AlterModelOptions(
            name='wordanalysis',
            options={'ordering': ['id']},
        ),
        migrations.RemoveField(
            model_name='suggested',
            name='exercise',
        ),
        migrations.AddField(
            model_name='exercise',
            name='suggested_answer',
            field=models.ManyToManyField(blank=True, related_name='exercises', to='lesson.suggested'),
        ),
    ]
