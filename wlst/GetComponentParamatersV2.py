import sys

class Artefacto:
	def __init__(self, servidor, particion, artefacto, version, fechaDespliegue, default, referencia, wsdl):
		self.servidor = servidor
		self.particion = particion
		self.artefacto = artefacto
		self.version = version
		self.fechaDespliegue = fechaDespliegue
		self.default = default
		self.referencia = referencia
		
def arrayToJSON(array):
	content = '[\n'
	index = 0
	for item in array:
		content += '{\n'
		cantAttributes = len(item.__dict__.keys())
		attributeIndex = 0
		for property, value in vars(item).iteritems():
			content += '\t"' + str(property) + '" : "' + str(value) + '"'
			if attributeIndex < (cantAttributes - 1):
				content += ',\n'
			attributeIndex = attributeIndex + 1
		content += '\n}'
		if index < len(array) - 1:
			content += ',\n'
		index = index + 1
	content += ']'
	return content
			
#read properties file
if len(sys.argv) != 2:
     print "Arguementos Invalidos:: Uso => GetComponentParamaters.py <ServerName> (COBRO,SINC,ASINC,UAT,IST,PSOA_AR,UAT116,PSOA_VE,PSOA_CO,PSOA_PR)"
     exit()

##########################################
#Setear Users para servidor
##########################################
serverConfigurado = 0	 
username='DTVLA_READONLY'
password='dtvro100'

#########################################
#Si se quiere setar un nuevo ambiente
# pegar esto en la sección SERVIDORES con los parametros modificados al ambiente requerido
#if 'NOMBRE_AMBIENTE' in sys.argv[1]: # tener cuidado que el nombre no esté dentro de los ambientes seteados debajo
#	url='IP:puerto' # IP:puerto
#	servers = ['SOA_COB1','SOA_COB2','SOA_COB3','SOA_COB4','SOA_COB5','SOA_COB6'] # cada uno de los servidores
#	serverConfigurado = 1
#########################################



######################################################################################################################
# 													SERVIDORES
#####################################################################################################################
#Prod AR - Cobro
if 'PROD_COBRO' in sys.argv[1]:
	url='172.22.163.202:7003'
	servers = ['SOA_COB1' ]#,'SOA_COB2','SOA_COB3','SOA_COB4','SOA_COB5','SOA_COB6']
	serverConfigurado = 1

#Prod AR - Sinc
if 'PROD_SINC' in sys.argv[1]:
	url='172.22.163.200:7001'
	servers = ['SOA_SINC1']#'SOA_SINC2','SOA_SINC3','SOA_SINC4','SOA_SINC5','SOA_SINC6']
	serverConfigurado = 1

#Prod AR - Asinc
if 'PROD_ASINC' in sys.argv[1]:
	url='172.22.163.201:7002'
	servers = ['SOA_ASINC1']#,'SOA_ASINC2','SOA_ASINC3','SOA_ASINC4','SOA_ASINC5','SOA_ASINC6']
	serverConfigurado = 1

#IST
if 'IST' in sys.argv[1]:
	url='172.22.164.170:7001'
	servers = ['WLS_SOA11']#,'WLS_SOA21']
	serverConfigurado = 1

#UAT
if 'UAT' in sys.argv[1]:
	url='172.22.164.216:7001'
	servers = ['WLS_SOA11']#,'WLS_SOA21']
	serverConfigurado = 1
	
#QAM_ASINC
if 'QAM_ASINC' in sys.argv[1]:
	url='172.21.104.48:7002'
	servers = ['SOA_ASINC1']#,'SOA_ASINC2']
	serverConfigurado = 1

#QAM_SINC
if 'QAM_SINC' in sys.argv[1]:
	url='172.21.104.48:7001'
	servers = ['SOA_SINC1']#,'SOA_ASINC2']
	serverConfigurado = 1

#QAM_COBRO
if 'QAM_COBRO' in sys.argv[1]:
	url='172.21.104.48:7003'
	servers = ['SOA_COBRO1']#,'SOA_ASINC2']
	serverConfigurado = 1


#LOCAL
if 'LOCAL' in sys.argv[1]:
	url='127.0.0.1:7001'
	username='weblogic'
	password='welcome1'
	servers = ['AdminServer']
	serverConfigurado = 1

	#DEV_MAN
if 'DEV_MAN' in sys.argv[1]:
	url='172.22.164.5:7001'
	servers = ['WLS_SOA']
	serverConfigurado = 1

	#DEV_PROY   PENDING
if 'DEV_PROY' in sys.argv[1]:
	url='172.22.164.151:7001'
	servers = ['WLS_SOA11'] # WLS_SOA22
	serverConfigurado = 1
	
if serverConfigurado == 0:
     print "Server no configurado: ",sys.argv[1]
     exit()	

params=['oracle.webservices.httpReadTimeout','15000']
sign=['java.lang.String','java.lang.String']
connect(username,password,url) 
domainRuntime()

artefactos = []
for i in range(len(servers)):
	soaBean = ObjectName('oracle.soa.config:Location='+servers[i]+',name=soa-infra,j2eeType=CompositeLifecycleConfig,Application=soa-infra')
	try:
		composites = mbs.getAttribute(soaBean,'DeployedComposites')
	except:
		archivo.write('Servidor:'+servers[i] +' offline\n')
		i = i+1
		continue
	for composite in composites:
		 dn = composite.get('DN').split('/')
		 partition = dn[0]
		 aplication = dn[1].split('!')
		 revision =aplication[1].split('*')
		 label = revision[1]
		 deployedTime = composite.get('deployedTime')
		 isDefault = composite.get('isDefault')
		 
		 servidor = sys.argv[1]
		 particion = ''
		 artefacto = ''
		 version = ''
		 fechaDespliegue = ''
		 artefactoDefault = ''
		 referencia = ''
		 wsdl = ''
		 
		 if 1 == isDefault:
		 	scaComposite=ObjectName('oracle.soa.config:Location='+servers[i]+',partition='+partition+',j2eeType=SCAComposite,revision='+revision[0]+',label='+label+',Application=soa-infra,wsconfigtype=WebServicesConfig,name="'+aplication[0]+'"')
			try:
				references = mbs.getAttribute(scaComposite,"References")
				if len(references)>0:
					for reference in references:
						nombreReferencia = mbs.getAttribute(reference,"Name")						
						bindings = mbs.getAttribute(reference,"Bindings")
						if len(bindings)>0:
							binding = bindings[0]
							wsdlUri = mbs.getAttribute(binding,"WSDLURI")
							particion = partition
							artefacto = aplication[0]
							version = revision[0]
							fechaDespliegue = deployedTime
							artefactoDefault = 'false'
							if isDefault:
								artefactoDefault = 'true'
							referencia = nombreReferencia
							wsdl = wsdlUri
						else:
							particion = partition
							artefacto = aplication[0]
							version = revision[0]
							fechaDespliegue = deployedTime
							artefactoDefault = 'false'
							if isDefault:
								artefactoDefault = 'true'
							referencia = nombreReferencia
							wsdl = ''
				else: 
					particion = ''
					artefacto = aplication[0]
					version = revision[0]
					fechaDespliegue = deployedTime
					artefactoDefault = 'false'
					if isDefault:
						artefactoDefault = 'true'
						
			except:
				artefacto = aplication[0]
			artefactos.append(Artefacto(servidor, particion, artefacto, version, fechaDespliegue, artefactoDefault, referencia, wsdl))
print ('[INICIO]')
print (arrayToJSON(artefactos))
print ('[FIN]')
disconnect()