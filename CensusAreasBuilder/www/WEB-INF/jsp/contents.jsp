<<<<<<< HEAD
<div class="navbar navbar-inverse navbar-fixed-top">
	<div class="navbar-inner cust-navbar-inner">
		<div class="container">
			<img src="img/dane/logo_dane.png" title="DANE" border="0" /> <img
				src="img/dane/logo_dane02.png" title="Prosperidad para todos"
				border="0" />
			<div class="cust-navbar-inner-titles">
				<h4 class="apptitle"><%=_title%></h4>
				<h4 class="appsubtitle"><%=_subtitle%></h4>
				<span class="nav-buttonbar">
					<div class="btn-group">
						<button id="mbtn_asist_bgmap" class="btn btn-mini dropdown-toggle"
							data-toggle="dropdown">
							Mapa <span class="caret"></span>
						</button>
						<ul class="dropdown-menu cust-dropdown-menu">
							<li><a href="#" id="defmap-gmaps">Google Maps Roadmap</a></li>
							<li><a href="#" id="defmap-agsonline01">Lona gris claro</a></li>
						</ul>
					</div> 
					<div class="btn-group">
						<a id="mbtn-asist-start" class="btn btn-mini" href="#cust-assist-modal" role="button" data-toggle="modal">Asistente</a>
					</div>
				</span>
			</div>
		</div>
	</div>
</div>

<div class="main-wrapper">
	<div class="container">
		<div class="map-wrapper">
			<div id="the_map"></div>
		</div>
	</div>
</div>

<div id="footer" class="navbar-fixed-bottom">
	<div class="container">
		<div class="cust-side-about" style="float: left;">&#64;&nbsp;DANE
			- Departamento Administrativo Nacional de Estad&iacute;stica, 2013</div>
		<div class="btn-toolbar cust-side-socialbar" style="float: right;">
			<div class="btn-group">
				<a class="btn" href="<%=_dane_twurl%>" rel="nofollow" title="Twitter: @DaneColombia" target="_blank"><i class="cust-icon-social-twitter"></i></a>
				<a class="btn" href="<%=_dane_fburl%>" rel="nofollow" title="Facebook: DaneColombia" target="_blank"><i class="cust-icon-social-facebook"></i></a> 
				<a class="btn" href="<%=_dane_yturl%>" rel="nofollow" title="YouTube: DaneColombia" target="_blank"><i class="cust-icon-social-youtube"></i></a>
			</div>
		</div>
		<div style="clear: both;"></div>
	</div>
</div>

<div id="cust-assist-modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="cust-assist-modal-label" data-backdrop="static" data-keyboard="false" aria-hidden="true">
	<div class="modal-header">
		<h3 id="cust-assist-modal-title"><%=_dane_assistant_title%></h3>
	</div>
	<div class="modal-body">
		<form class="form-horizontal cust-assist-form-step01">
			<div class="control-group">
				<label class="control-label" for="layerSourceSelect">&Aacute;rea de trabajo</label>
				<div class="controls">
					<select id="layerSourceSelect">
						<option value="none">Seleccionar...</option>
					</select>
				</div>
			</div>
			<div class="control-group">
				<label class="control-label" for="inputEmail">Atributo de capa</label>
				<div class="controls">
					<select id="layerAttributeSelect">
						<option value="none">Seleccionar...</option>
					</select>
				</div>
			</div>
			<div class="control-group">
				<label class="control-label" for="conditionValueInput">Valor</label>
				<div class="controls">
					<input type="text" id="conditionValueInput" placeholder="Valor">
				</div>
			</div>
		</form>
	</div>
	<div class="modal-footer">
		<button id="cust-assist-btn-close" class="btn btn-mini" data-dismiss="modal" aria-hidden="true">Cancelar</button>
		<button id="cust-assist-btn-next" class="btn btn-mini">Continuar</button>
	</div>
</div>

<script type="text/javascript">
var ROOT = ROOT || { imgpath : '<%=_contextPath%>/img', arcgis_query:'<%=_contextPath%>/arcgis_query'};
</script>
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
<script type="text/javascript" src="js/keydragzoom.js"></script>
<script type="text/javascript" src="js/gmaps.js"></script>
<script type="text/javascript" src="js/aug.js"></script>
<script type="text/javascript" src="js/json2.js"></script>
<script type="text/javascript" src="js/cabb.data.js"></script>
<script type="text/javascript" src="js/cabb.js"></script>
=======
<div class="navbar navbar-inverse navbar-fixed-top">
	<div class="navbar-inner cust-navbar-inner">
		<div class="container">
			<img src="img/dane/logo_dane.png" title="DANE" border="0" /> <img
				src="img/dane/logo_dane02.png" title="Prosperidad para todos"
				border="0" />
			<div class="cust-navbar-inner-titles">
				<h4 class="apptitle"><%=_title%></h4>
				<h4 class="appsubtitle"><%=_subtitle%></h4>
				<span class="nav-buttonbar">
					<div class="btn-group">
						<button id="mbtn_asist_bgmap" class="btn btn-mini dropdown-toggle"
							data-toggle="dropdown">
							Mapa <span class="caret"></span>
						</button>
						<ul class="dropdown-menu cust-dropdown-menu">
							<li><a href="#" id="defmap-gmaps">Google Maps Roadmap</a></li>
							<li><a href="#" id="defmap-agsonline01">Lona gris claro</a></li>
						</ul>
					</div> 
					<div class="btn-group">
						<a id="mbtn-asist-start" class="btn btn-mini" href="#cust-assist-modal" role="button" data-toggle="modal">Asistente</a>
					</div>
				</span>
			</div>
		</div>
	</div>
</div>

<div class="main-wrapper">
	<div class="container">
		<div class="map-wrapper">
			<div id="the_map"></div>
		</div>
	</div>
</div>

<div id="footer" class="navbar-fixed-bottom">
	<div class="container">
		<div class="cust-side-about" style="float: left;">&#64;&nbsp;DANE
			- Departamento Administrativo Nacional de Estad&iacute;stica, 2013</div>
		<div class="btn-toolbar cust-side-socialbar" style="float: right;">
			<div class="btn-group">
				<a class="btn" href="<%=_dane_twurl%>" rel="nofollow" title="Twitter: @DaneColombia" target="_blank"><i class="cust-icon-social-twitter"></i></a>
				<a class="btn" href="<%=_dane_fburl%>" rel="nofollow" title="Facebook: DaneColombia" target="_blank"><i class="cust-icon-social-facebook"></i></a> 
				<a class="btn" href="<%=_dane_yturl%>" rel="nofollow" title="YouTube: DaneColombia" target="_blank"><i class="cust-icon-social-youtube"></i></a>
			</div>
		</div>
		<div style="clear: both;"></div>
	</div>
</div>

<div id="cust-assist-modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="cust-assist-modal-label" data-backdrop="static" data-keyboard="false" aria-hidden="true">
	<div class="modal-header">
		<h3 id="cust-assist-modal-title"><%=_dane_assistant_title%></h3>
	</div>
	<div class="modal-body">
		<form class="form-horizontal cust-assist-form-step01">
			<div class="control-group">
				<label class="control-label" for="layerSourceSelect">&Aacute;rea de trabajo</label>
				<div class="controls">
					<select id="layerSourceSelect">
						<option value="none">Seleccionar...</option>
					</select>
				</div>
			</div>
			<div class="control-group">
				<label class="control-label" for="inputEmail">Atributo de capa</label>
				<div class="controls">
					<select id="layerAttributeSelect">
						<option value="none">Seleccionar...</option>
					</select>
				</div>
			</div>
			<div class="control-group">
				<label class="control-label" for="conditionValueInput">Valor</label>
				<div class="controls">
					<input type="text" id="conditionValueInput" placeholder="Valor">
				</div>
			</div>
		</form>
	</div>
	<div class="modal-footer">
		<button id="cust-assist-btn-close" class="btn btn-mini" data-dismiss="modal" aria-hidden="true">Cancelar</button>
		<button id="cust-assist-btn-next" class="btn btn-mini">Continuar</button>
	</div>
</div>

<script type="text/javascript">
var ROOT = ROOT || { imgpath : '<%=_contextPath%>/img', arcgis_query:'<%=_contextPath%>/arcgis_query'};
</script>
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
<script type="text/javascript" src="js/keydragzoom.js"></script>
<script type="text/javascript" src="js/gmaps.js"></script>
<script type="text/javascript" src="js/aug.js"></script>
<script type="text/javascript" src="js/json2.js"></script>
<script type="text/javascript" src="js/cabb.data.js"></script>
<script type="text/javascript" src="js/cabb.js"></script>
>>>>>>> 62358265884161aaeab91b8c3d66d7b4293815a0
<script type="text/javascript" src="js/application.js"></script>