from django.db import models


class Asesorados(models.Model):
    cuil = models.BigIntegerField(blank=False, null=False)
    nombre = models.CharField(max_length=70, blank=False, null=False)
    apellido = models.CharField(max_length=70, blank=False, null=False)


class Convenios(models.Model):
    nombre = models.CharField(max_length=30, blank=False, null=False)
    descripcion = models.TextField(blank=True, null=True)


class DepartamentosCiudad(models.Model):
    nombre = models.CharField(max_length=70, blank=False, null=False)
    descripcion = models.TextField(blank=True, null=True)


class DepartamentosDelMinisterio(models.Model):
    nombre = models.CharField(max_length=30, blank=False, null=False)
    descripcion = models.TextField(blank=True, null=True)


class Direcciones(models.Model):
    calle = models.CharField(max_length=70, blank=False, null=False)
    altura = models.IntegerField(blank=False, null=False)


class EstadosDeUsuario(models.Model):
    nombre = models.CharField(max_length=30, blank=False, null=False)
    descripcion = models.TextField(blank=True, null=True)


class EstadosDeVerificacionDeUsuario(models.Model):
    nombre = models.CharField(max_length=30, blank=False, null=False)
    descripcion = models.TextField(blank=True, null=True)


class EstadosDeVisita(models.Model):
    nombre = models.CharField(max_length=30, blank=False, null=False)
    descripcion = models.TextField(blank=True, null=True)


class Faqs(models.Model):
    pregunta = models.TextField(blank=True, null=False)


class Intendentes(models.Model):
    nombre = models.CharField(max_length=70, blank=False, null=False)
    apellido = models.CharField(max_length=70, blank=False, null=False)


class Localidades(models.Model):
    nombre = models.CharField(max_length=70, blank=False, null=False)
    id_departamento = models.ForeignKey(DepartamentosCiudad, models.DO_NOTHING, db_column='ID_DEPARTAMENTO',
                                        blank=False, null=False)


class Logos(models.Model):
    nombre = models.CharField(max_length=30, blank=False, null=False)
    descripcion = models.TextField(blank=True, null=True)


class MarcasDeVehiculos(models.Model):
    nombre = models.CharField(max_length=30, blank=False, null=False)


class ModelosDeVehiculos(models.Model):
    nombre = models.CharField(max_length=50, blank=False, null=False)
    id_marca = models.ForeignKey(MarcasDeVehiculos, models.DO_NOTHING, blank=False, null=False)


class PartidosPoliticos(models.Model):
    nombre = models.CharField(max_length=30, blank=False, null=False)
    descripcion = models.TextField(blank=True, null=True)


class PatentesDeVehiculos(models.Model):
    patente = models.CharField(max_length=7, blank=False, null=False)


class Roles(models.Model):
    nombre = models.CharField(max_length=30, blank=False, null=False)
    descripcion = models.TextField(blank=True, null=True)


class ReferentesContactados(models.Model):
    nombre = models.CharField(max_length=70, blank=False, null=False)
    apellido = models.CharField(max_length=70, blank=False,
                                null=False)


class Usuarios(models.Model):
    nombre_de_usuario = models.CharField(max_length=30, blank=False, null=False)
    cuil = models.BigIntegerField(blank=False, null=False)
    contrasenia = models.TextField(blank=False, null=False)
    foto_de_perfil = models.TextField(blank=True, null=True)
    id_rol = models.ForeignKey(Roles, models.DO_NOTHING, blank=False, null=False)
    id_estado_de_verificacion = models.ForeignKey(EstadosDeVerificacionDeUsuario, models.DO_NOTHING,
                                                  blank=False, null=False)
    id_estado_de_usuario = models.ForeignKey(EstadosDeUsuario, models.DO_NOTHING, db_column='ID_ESTADO_DE_USUARIO',
                                             blank=False, null=False)


class Grupos(models.Model):
    nombre = models.CharField(max_length=70, blank=False, null=False)


class Vehiculos(models.Model):
    id_patente = models.ForeignKey(PatentesDeVehiculos, models.DO_NOTHING, blank=False,
                                   null=False)
    id_marca = models.ForeignKey(MarcasDeVehiculos, models.DO_NOTHING, blank=False, null=False)
    id_modelo = models.ForeignKey(ModelosDeVehiculos, models.DO_NOTHING, blank=False, null=False)


class Visitas(models.Model):
    flyer = models.IntegerField(blank=False, null=False)
    distancia = models.IntegerField(blank=False, null=False)
    tiempo_de_viaje = models.IntegerField(blank=False, null=False)
    fecha_de_visita = models.DateField(blank=False, null=False)
    registro_civil = models.IntegerField(blank=False, null=False)
    hospedaje = models.IntegerField(blank=False, null=False)
    fondo_de_modernizacion = models.IntegerField(blank=False, null=False)
    horario_inicio = models.DateTimeField(blank=False, null=False)
    horario_finalizacion = models.DateTimeField(blank=False, null=False)
    nombre_lugar = models.CharField(max_length=70, blank=False, null=False)
    id_localidad = models.ForeignKey(Localidades, models.DO_NOTHING, blank=False, null=False)
    id_grupo = models.ForeignKey(Grupos, models.DO_NOTHING, blank=False, null=False)
    id_estado_de_visita = models.ForeignKey(EstadosDeVisita, models.DO_NOTHING, db_column='ID_ESTADO_DE_VISITA',
                                            blank=False, null=False)
    id_convenio_firmado = models.ManyToManyField(Convenios, db_column='ID_CONVENIO_FIRMADO')
    id_referente_contactado = models.ForeignKey(ReferentesContactados, models.DO_NOTHING,
                                                blank=False, null=False)
    id_direccion = models.ForeignKey(Direcciones, models.DO_NOTHING, blank=False, null=False)
    id_logo = models.ManyToManyField(Logos, db_column='ID_LOGO')


class EstadoDeConsulta(models.Model):
    nombre = models.CharField(max_length=30, blank=False, null=False)
    descripcion = models.TextField(blank=True, null=True)


class Consultas(models.Model):
    id_visita = models.ForeignKey('Visitas', models.DO_NOTHING, blank=False, null=False)
    id_asesorado = models.ForeignKey(advised, models.DO_NOTHING, blank=False, null=False)
    id_asesor = models.ForeignKey('Usuarios', models.DO_NOTHING, blank=False, null=False)
    id_departamento_ministerio = models.ForeignKey('DepartamentosDelMinisterio', models.DO_NOTHING,
                                                   blank=False, null=False)
    id_faq = models.ForeignKey('Faqs', models.DO_NOTHING, blank=False, null=False)
    id_estado = models.ForeignKey('EstadoDeConsulta', models.DO_NOTHING, blank=False, null=False)


class Coordinadores(models.Model):
    id_usuario = models.OneToOneField('Usuarios', models.DO_NOTHING, blank=False, null=False)
    id_grupo = models.ForeignKey('Grupos', models.DO_NOTHING, blank=False, null=False)


class Asesores(models.Model):
    id_usuario = models.ForeignKey('Usuarios', models.DO_NOTHING, blank=False, null=False)
    id_grupo = models.ForeignKey('Grupos', models.DO_NOTHING, blank=False, null=False)

    unique_together = (('id_usuario', 'id_grupo'),)


class EmailsIntendentes(models.Model):
    mail = models.CharField(max_length=100, blank=False, null=False)
    id_intendente = models.ForeignKey('Intendentes', models.DO_NOTHING, blank=False,
                                      null=False)


class EmailsReferentesContactados(models.Model):
    mail = models.CharField(max_length=100, blank=False, null=False)
    id_referente = models.ForeignKey('ReferentesContactados', models.DO_NOTHING, blank=False,
                                     null=False)


class EmailsUsuarios(models.Model):
    mail = models.CharField(max_length=100, blank=False, null=False)
    id_usuario = models.ForeignKey('Usuarios', models.DO_NOTHING, blank=False, null=False)


class TelefonosIntendentes(models.Model):
    telefono = models.BigIntegerField(blank=False, null=False)
    id_intendente = models.ForeignKey(Intendentes, models.DO_NOTHING, blank=False,
                                      null=False)


class TelefonosReferentesContactados(models.Model):
    telefono = models.BigIntegerField(blank=False, null=False)
    id_referente = models.ForeignKey(ReferentesContactados, models.DO_NOTHING, blank=False,
                                     null=False)
