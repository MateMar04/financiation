# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Asesorados(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)
    cuil = models.BigIntegerField(db_column='CUIL', blank=True, null=True)
    nombre = models.CharField(db_column='NOMBRE', max_length=70, blank=True, null=True)
    apellido = models.CharField(db_column='APELLIDO', max_length=70, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'asesorados'


class Convenios(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)
    nombre = models.CharField(db_column='NOMBRE', max_length=30, blank=True, null=True)
    descripcion = models.TextField(db_column='DESCRIPCION', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'convenios'


class DepartamentosCiudad(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)
    nombre = models.CharField(db_column='NOMBRE', max_length=70, blank=True, null=True)
    descripcion = models.TextField(db_column='DESCRIPCION', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'departamentos_ciudad'


class DepartamentosDelMinisterio(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)
    nombre = models.CharField(db_column='NOMBRE', max_length=30, blank=True, null=True)
    descripcion = models.TextField(db_column='DESCRIPCION', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'departamentos_del_ministerio'


class Direcciones(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)
    calle = models.CharField(db_column='CALLE', max_length=70, blank=True, null=True)
    altura = models.IntegerField(db_column='ALTURA', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'direcciones'


class EmailsReferentesContactados(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)
    mail = models.CharField(db_column='MAIL', max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'emails_referentes_contactados'


class EmailsUsuarios(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)
    mail = models.CharField(db_column='MAIL', max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'emails_usuarios'


class EstadosDeUsuario(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)
    nombre = models.CharField(db_column='NOMBRE', max_length=30, blank=True, null=True)
    descripcion = models.TextField(db_column='DESCRIPCION', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'estados_de_usuario'


class EstadosDeVerificacionDeUsuario(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)
    nombre = models.CharField(db_column='NOMBRE', max_length=30, blank=True, null=True)
    descripcion = models.TextField(db_column='DESCRIPCION', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'estados_de_verificacion_de_usuario'


class EstadosDeVisita(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)
    nombre = models.CharField(db_column='NOMBRE', max_length=30, blank=True, null=True)
    descripcion = models.TextField(db_column='DESCRIPCION', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'estados_de_visita'


class Faqs(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)
    pregunta = models.TextField(db_column='PREGUNTA', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'faqs'


class Intendentes(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)
    nombre = models.CharField(db_column='NOMBRE', max_length=70, blank=True, null=True)
    apellido = models.CharField(db_column='APELLIDO', max_length=70, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'intendentes'


class Localidades(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)
    nombre = models.CharField(db_column='NOMBRE', max_length=70, blank=True, null=True)
    id_departamento = models.ForeignKey(DepartamentosCiudad, models.DO_NOTHING, db_column='ID_DEPARTAMENTO', blank=True,
                                        null=True)

    class Meta:
        managed = False
        db_table = 'localidades'


class Logos(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)
    nombre = models.CharField(db_column='NOMBRE', max_length=30, blank=True, null=True)
    descripcion = models.TextField(db_column='DESCRIPCION', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'logos'


class MarcasDeVehiculos(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)
    nombre = models.CharField(db_column='NOMBRE', max_length=30, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'marcas_de_vehiculos'


class ModelosDeVehiculos(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)
    nombre = models.CharField(db_column='NOMBRE', max_length=50, blank=True, null=True)
    id_marca = models.ForeignKey(MarcasDeVehiculos, models.DO_NOTHING, db_column='ID_MARCA', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'modelos_de_vehiculos'


class PartidosPoliticos(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)
    nombre = models.CharField(db_column='NOMBRE', max_length=30, blank=True, null=True)
    descripcion = models.TextField(db_column='DESCRIPCION', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'partidos_politicos'


class PatentesDeVehiculos(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)
    patente = models.CharField(db_column='PATENTE', max_length=7, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'patentes_de_vehiculos'


class Roles(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)
    nombre = models.CharField(db_column='NOMBRE', max_length=30, blank=True, null=True)
    descripcion = models.TextField(db_column='DESCRIPCION', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'roles'


class TelefonosReferentesContactados(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)
    telefono = models.BigIntegerField(db_column='TELEFONO', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'telefonos_referentes_contactados'


class ReferentesContactados(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)
    nombre = models.CharField(db_column='NOMBRE', max_length=70, blank=True, null=True)
    apellido = models.CharField(db_column='APELLIDO', max_length=70, blank=True, null=True)
    id_email = models.ManyToManyField(EmailsReferentesContactados, db_column='ID_EMAIL')
    id_telefono = models.ManyToManyField(TelefonosReferentesContactados, db_column='ID_TELEFONO')

    class Meta:
        managed = False
        db_table = 'referentes_contactados'


class Usuarios(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)
    nombre_de_usuario = models.CharField(db_column='NOMBRE_DE_USUARIO', max_length=30, blank=True, null=True)
    cuil = models.BigIntegerField(db_column='CUIL', blank=True, null=True)
    contrasenia = models.TextField(db_column='CONTRASENIA', blank=True, null=True)
    foto_de_perfil = models.TextField(db_column='FOTO_DE_PERFIL', blank=True, null=True)
    id_email = models.ManyToManyField(EmailsUsuarios, db_column='ID_EMAIL')
    id_rol = models.ForeignKey(Roles, models.DO_NOTHING, db_column='ID_ROL', blank=True, null=True)
    id_estado_de_verificacion = models.ForeignKey(EstadosDeVerificacionDeUsuario, models.DO_NOTHING,
                                                  db_column='ID_ESTADO_DE_VERIFICACION', blank=True, null=True)
    id_estado_de_usuario = models.ForeignKey(EstadosDeUsuario, models.DO_NOTHING, db_column='ID_ESTADO_DE_USUARIO',
                                             blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'usuarios'


class Grupos(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)
    nombre = models.CharField(db_column='NOMBRE', max_length=70, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'grupos'


class Vehiculos(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)
    id_patente = models.ForeignKey(PatentesDeVehiculos, models.DO_NOTHING, db_column='ID_PATENTE', blank=True,
                                   null=True)
    id_marca = models.ForeignKey(MarcasDeVehiculos, models.DO_NOTHING, db_column='ID_MARCA', blank=True, null=True)
    id_modelo = models.ForeignKey(ModelosDeVehiculos, models.DO_NOTHING, db_column='ID_MODELO', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'vehiculos'


class Visitas(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)
    flyer = models.IntegerField(db_column='FLYER', blank=True, null=True)
    distancia = models.IntegerField(db_column='DISTANCIA', blank=True, null=True)
    tiempo_de_viaje = models.IntegerField(db_column='TIEMPO_DE_VIAJE', blank=True, null=True)
    fecha_de_visita = models.DateField(db_column='FECHA_DE_VISITA', blank=True, null=True)
    registro_civil = models.IntegerField(db_column='REGISTRO_CIVIL', blank=True, null=True)
    hospedaje = models.IntegerField(db_column='HOSPEDAJE', blank=True, null=True)
    fondo_de_modernizacion = models.IntegerField(db_column='FONDO_DE_MODERNIZACION', blank=True, null=True)
    horario_inicio = models.DateTimeField(db_column='HORARIO_INICIO', blank=True, null=True)
    horario_finalizacion = models.DateTimeField(db_column='HORARIO_FINALIZACION', blank=True, null=True)
    nombre_lugar = models.CharField(db_column='NOMBRE_LUGAR', max_length=70, blank=True, null=True)
    id_localidad = models.ForeignKey(Localidades, models.DO_NOTHING, db_column='ID_LOCALIDAD', blank=True, null=True)
    id_grupo = models.ForeignKey(Grupos, models.DO_NOTHING, db_column='ID_GRUPO', blank=True, null=True)
    id_estado_de_visita = models.ForeignKey(EstadosDeVisita, models.DO_NOTHING, db_column='ID_ESTADO_DE_VISITA',
                                            blank=True, null=True)
    id_convenio_firmado = models.ManyToManyField(Convenios, db_column='ID_CONVENIO_FIRMADO')
    id_referente_contactado = models.ForeignKey(ReferentesContactados, models.DO_NOTHING,
                                                db_column='ID_REFERENTE_CONTACTADO', blank=True, null=True)
    id_direccion = models.ForeignKey(Direcciones, models.DO_NOTHING, db_column='ID_DIRECCION', blank=True, null=True)
    id_logo = models.ManyToManyField(Logos, db_column='ID_LOGO')

    class Meta:
        managed = False
        db_table = 'visitas'


class Consultas(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)
    id_visita = models.ForeignKey(Visitas, models.DO_NOTHING, db_column='ID_VISITA', blank=True, null=True)
    id_asesorado = models.ForeignKey(Asesorados, models.DO_NOTHING, db_column='ID_ASESORADO', blank=True, null=True)
    id_asesor = models.ForeignKey(Usuarios, models.DO_NOTHING, db_column='ID_ASESOR', blank=True, null=True)
    id_departamento_ministerio = models.ForeignKey('DepartamentosDelMinisterio', models.DO_NOTHING,
                                                   db_column='ID_DEPARTAMENTO_MINISTERIO', blank=True, null=True)
    id_faq = models.ForeignKey(Faqs, models.DO_NOTHING, db_column='ID_FAQ', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'consultas'


class Coordinadores(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)
    id_usuario = models.OneToOneField('Usuarios', models.DO_NOTHING, db_column='ID_USUARIO', blank=True, null=True)
    id_grupo = models.ForeignKey('Grupos', models.DO_NOTHING, db_column='ID_GRUPO', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'coordinadores'


class Asesores(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)
    id_usuario = models.ForeignKey('Usuarios', models.DO_NOTHING, db_column='ID_USUARIO', blank=True, null=True)
    id_grupo = models.ForeignKey('Grupos', models.DO_NOTHING, db_column='ID_GRUPO', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'asesores'
        unique_together = (('id_usuario', 'id_grupo'),)
