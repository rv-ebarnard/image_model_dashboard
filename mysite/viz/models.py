from django.db import models

# Create your models here.
# image_name; ctr; black_x; text; girl; headwear; poster; fun; skyblue

class FeatureCTR(models.Model):
    image_name = models.CharField(max_length=100, primary_key=True, null=False, unique=True)
    ctr = models.DecimalField(max_digits=20, decimal_places=19)
    black_x = models.DecimalField(max_digits=20, decimal_places=19)
    text = models.DecimalField(max_digits=20, decimal_places=19)
    girl = models.DecimalField(max_digits=20, decimal_places=19)
    headwear = models.DecimalField(max_digits=20, decimal_places=19)
    poster = models.DecimalField(max_digits=20, decimal_places=19)
    fun = models.DecimalField(max_digits=20, decimal_places=19)
    skyblue = models.DecimalField(max_digits=20, decimal_places=19)
    def __str__(self):
        return self.image_name