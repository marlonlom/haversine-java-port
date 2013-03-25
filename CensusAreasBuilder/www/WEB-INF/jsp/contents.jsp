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
						<button id="mbtn_asist_maplayer" class="btn btn-mini dropdown-toggle" data-toggle="dropdown">Capa
							<span class="caret"></span>
						</button>
						<ul class="dropdown-menu cust-dropdown-menu cust-menu-maplayer">
							<li><a href="#" data-cust-layer-id="0">&Aacute;rea de trabajo 01</a></li>
							<li><a href="#" data-cust-layer-id="1">&Aacute;rea de trabajo 02</a></li>
							<li><a href="#" data-cust-layer-id="2">&Aacute;rea de trabajo 03</a></li>
							<li><a href="#" data-cust-layer-id="3">&Aacute;rea de trabajo 04</a></li>
							<li><a href="#" data-cust-layer-id="4">&Aacute;rea de trabajo 05</a></li>
							<li><a href="#" data-cust-layer-id="5">&Aacute;rea de trabajo 06</a></li>
						</ul>
					</div>
					<div class="btn-group">
						<a id="mbtn-asist-start" class="btn btn-mini disabled">Asistente</a>
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

<div id="cust-assist-modal" class="modal hide fade" tabindex="-1"
	role="dialog" aria-labelledby="cust-assist-modal-label"
	aria-hidden="true" style="display: none;">
	<div class="modal-header">
		<h3 id="cust-assist-modal-title"><%=_dane_assistant_title%></h3>
	</div>
	<div class="modal-body">
		<form class="form-horizontal cust-assist-form-step01">
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
		<form class="form-horizontal cust-assist-form-step02">
			<div class="control-group">
				<label class="control-label" for="bffrDistanceInput">Tama&ntilde;o buffer</label>
				<div class="controls">
					<input type="text" id="bffrDistanceInput" placeholder="Valor">
				</div>
			</div>
		</form>
	</div>
	<div class="modal-footer">
		<button class="btn btn-mini" data-dismiss="modal" aria-hidden="true">Close</button>
		<button id="cust-assist-btn-prev" class="btn btn-mini">Atr&aacute;s</button>
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
<script type="text/javascript" src="js/cabb.js"></script>
<script type="text/javascript" src="js/application.js"></script>