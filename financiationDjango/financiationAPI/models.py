from django.db import models


# Create your models here.
class Advised(models.Model):
    ssn = models.BigIntegerField()
    first_name = models.CharField(max_length=70)
    last_name = models.CharField(max_length=70)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
