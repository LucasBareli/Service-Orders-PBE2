from django.db import models

class Gestores(models.Model):
    ni = models.IntegerField()
    nome = models.CharField(max_length=100)
    area = models.CharField(max_length=50)
    cargo = models.CharField(max_length=50)

class Responsaveis(models.Model):
    ni = models.IntegerField()
    nome = models.CharField(max_length=100)
    ambiente = models.ForeignKey('Ambientes', on_delete=models.SET_NULL, null=True, blank=True)
    gestor = models.ForeignKey('Gestores', on_delete=models.SET_NULL, null=True, blank=True)

class Patrimonios(models.Model):
    localizacao = models.IntegerField()
    ni = models.IntegerField()
    descricao = models.TextField()

class Ambientes(models.Model):
    num_sala = models.IntegerField()
    descricao = models.CharField(max_length=255)
    ni = models.IntegerField()
    responsavel = models.ForeignKey('Responsaveis', on_delete=models.SET_NULL, null=True, blank=True)

class Manutentores(models.Model):
    nome = models.CharField(max_length=100)
    area = models.CharField(max_length=50)
    ni = models.IntegerField()

class OrdemServico(models.Model):
    descricao = models.TextField()
    data_abertura = models.DateTimeField(auto_now_add=True)
    data_encerramento = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=255)
    patrimonio = models.ForeignKey('Patrimonios', on_delete=models.SET_NULL, null=True, blank=True)
    ambiente = models.ForeignKey('Ambientes', on_delete=models.SET_NULL, null=True, blank=True)
    responsavel = models.ForeignKey('Responsaveis', on_delete=models.SET_NULL, null=True, blank=True)
    manutentor = models.ForeignKey('Manutentores', on_delete=models.SET_NULL, null=True, blank=True)
    opcoes_prioridade = (
        ('Alta', 'alta'),
        ('Media', 'media'),
        ('Baixa', 'baixa')
    
    )
    prioridade = models.CharField(max_length=10, choices=opcoes_prioridade, default='Baixa')

class Historico(models.Model):
    ordem = models.ForeignKey('OrdemServico', on_delete=models.SET_NULL, null=True, blank=True)
    data_encerramento = models.DateTimeField()
    descricao_manutencao = models.TextField()