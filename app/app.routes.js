"use strict";
var students_component_1 = require('./students.component');
var admin_component_1 = require('./admin.component');
var com_component_1 = require('./com.component');
var inicio_component_1 = require('./dashboard/inicio/inicio.component');
var timeline_component_1 = require('./dashboard/inicio/timeline/timeline.component');
var cursos_component_1 = require('./dashboard/cursos/cursos.component');
var requisitos_component_1 = require('./dashboard/formularios/requisitos/requisitos.component');
var rn_component_1 = require('./dashboard/formularios/rn/rn.component');
var inclusiones_component_1 = require('./dashboard/formularios/inclusiones/inclusiones.component');
var solicitudes_component_1 = require('./dashboard/solicitudes/solicitudes.component');
var solicitud_component_1 = require('./dashboard/solicitudes/solicitud.component');
//
var estudiantesAdmin_component_1 = require('./dashboardAdmin/estudiantesAdmin/estudiantesAdmin.component');
var inicioAdmin_component_1 = require('./dashboardAdmin/inicioAdmin/inicioAdmin.component');
var inclusionesAdmin_component_1 = require('./dashboardAdmin/inclusionesAdmin/inclusionesAdmin.component');
var levantamientoRNAdmin_component_1 = require('./dashboardAdmin/levantamientoRNAdmin/levantamientoRNAdmin.component');
var inclusionDetails_component_1 = require('./dashboardAdmin/inclusionesAdmin/inclusion/inclusionDetails.component');
var levantamientoAdmin_component_1 = require('./dashboardAdmin/levantamientoAdmin/levantamientoAdmin.component');
var levantamientoDetails_component_1 = require('./dashboardAdmin/levantamientoAdmin/levantamiento/levantamientoDetails.component');
var levantamientoRNDetails_component_1 = require('./dashboardAdmin/levantamientoRNAdmin/levantamientoRN/levantamientoRNDetails.component');
var tableNotificaciones_component_1 = require('./dashboardAdmin/inicioAdmin/tableNotificaciones/tableNotificaciones.component');
var tableEstudiantes_component_1 = require('./dashboardAdmin/estudiantesAdmin/tableEstudiantes/tableEstudiantes.component');
var tableInclusiones_component_1 = require('./dashboardAdmin/inclusionesAdmin/tableInclusiones/tableInclusiones.component');
var tableLevantamiento_component_1 = require('./dashboardAdmin/levantamientoAdmin/tableLevantamiento/tableLevantamiento.component');
var tableUsersAdmin_component_1 = require('./dashboardAdmin/usersManageAdmin/tableUsers/tableUsersAdmin.component');
var tableRN_component_1 = require('./dashboardAdmin/levantamientoRNAdmin/tableRN/tableRN.component');
var login_component_1 = require('./login.component');
var loginAdCo_component_1 = require('./loginAdCo/loginAdCo.component');
var estudiantesLogin_component_1 = require('./login/estudiantesLogin.component');
var verificacionLogin_component_1 = require('./login/verificacionLogin.component');
var perfil_component_1 = require('./dashboard/perfil/perfil.component');
var apelaciones_component_1 = require('./dashboard/apelaciones/apelaciones.component');
var apelacion_component_1 = require('./dashboard/apelaciones/apelacion.component');
var settingsAdmin_component_1 = require('./dashboardAdmin/settingsAdmin/settingsAdmin.component');
var usersManageAdmin_component_1 = require('./dashboardAdmin/usersManageAdmin/usersManageAdmin.component');
var addUserAdmin_component_1 = require('./dashboardAdmin/usersManageAdmin/addUser/addUserAdmin.component');
var addRolAdmin_component_1 = require('./dashboardAdmin/usersManageAdmin/roles/addRolAdmin.component');
var apelacionAdmin_component_1 = require('./dashboardAdmin/apelacionesAdmin/apelacionAdmin.component');
var tableApelacion_component_1 = require('./dashboardAdmin/apelacionesAdmin/tableApelacion/tableApelacion.component');
var apelacionDetails_component_1 = require('./dashboardAdmin/apelacionesAdmin/apelacion/apelacionDetails.component');
var userInfoAdmin_component_1 = require('./dashboardAdmin/userInfo/userInfoAdmin.component');
//
var inicioCom_component_1 = require('./dashboardCom/inicioCom/inicioCom.component');
var inclusionesCom_component_1 = require('./dashboardCom/inclusionesCom/inclusionesCom.component');
var levantamientoRNCom_component_1 = require('./dashboardCom/levantamientoRNCom/levantamientoRNCom.component');
var inclusionDetails_component_2 = require('./dashboardCom/inclusionesCom/inclusion/inclusionDetails.component');
var levantamientoCom_component_1 = require('./dashboardCom/levantamientoCom/levantamientoCom.component');
var levantamientoDetails_component_2 = require('./dashboardCom/levantamientoCom/levantamiento/levantamientoDetails.component');
var levantamientoRNDetails_component_2 = require('./dashboardCom/levantamientoRNCom/levantamientoRN/levantamientoRNDetails.component');
var tableNotificaciones_component_2 = require('./dashboardCom/inicioCom/tableNotificaciones/tableNotificaciones.component');
var tableInclusiones_component_2 = require('./dashboardCom/inclusionesCom/tableInclusiones/tableInclusiones.component');
var tableLevantamientoCom_component_1 = require('./dashboardCom/levantamientoCom/tableLevantamiento/tableLevantamientoCom.component');
var tableRNCom_component_1 = require('./dashboardCom/levantamientoRNCom/tableRN/tableRNCom.component');
var apelacionCom_component_1 = require('./dashboardCom/apelacionesCom/apelacionCom.component');
var tableApelacion_component_2 = require('./dashboardCom/apelacionesCom/tableApelacion/tableApelacion.component');
var apelacionDetails_component_2 = require('./dashboardCom/apelacionesCom/apelacion/apelacionDetails.component');
var userInfoCom_component_1 = require('./dashboardCom/userInfo/userInfoCom.component');
//Routes ti be imported in dashboard modules
exports.MODULE_ROUTES = [
    { path: '', redirectTo: 'estudiantes', pathMatch: 'full' },
    {
        path: 'login', component: login_component_1.LoginComponent, children: [
            { path: '', redirectTo: 'estudiantes', pathMatch: 'full' },
            { path: 'estudiantes', component: estudiantesLogin_component_1.EstudiantesLoginComponent },
            { path: 'verificacion/:id/:email', component: verificacionLogin_component_1.VerificacionLoginComponent },
        ]
    },
    { path: 'loginAdCo', component: loginAdCo_component_1.LoginAdCoComponent },
    // {
    //     path: 'loginAdCo', component: LoginAdCoComponent
    //     // , children: [
    //     //     // { path: '', redirectTo: 'estudiantes', pathMatch: 'full' },
    //     //     { path: 'admin', component: AdminComponent },
    //     //     { path: 'com', component: ComComponent },
    //     // ]
    // },
    {
        path: 'admin', component: admin_component_1.AdminComponent, children: [
            { path: '', redirectTo: 'inicio', pathMatch: 'full' },
            { path: 'inicio', component: inicioAdmin_component_1.InicioAdminComponent },
            { path: 'estudiantes', component: estudiantesAdmin_component_1.EstudiantesAdminComponent },
            { path: 'inclusiones', component: inclusionesAdmin_component_1.InclusionesAdminComponent },
            { path: 'inclusiones/:inclusionID', component: inclusionDetails_component_1.InclusionesDetailsAdminComponent },
            { path: 'levantamiento', component: levantamientoAdmin_component_1.LevantamientoAdminComponent },
            { path: 'levantamiento/:levantamientoId', component: levantamientoDetails_component_1.LevantamientoDetailsAdminComponent },
            { path: 'levantamientoRN', component: levantamientoRNAdmin_component_1.LevantamientoRNAdminComponent },
            { path: 'levantamientoRN/:levantamientoRNID', component: levantamientoRNDetails_component_1.LevantamientoRNDetailsAdminComponent },
            { path: 'apelacion', component: apelacionAdmin_component_1.ApelacionAdminComponent },
            { path: 'apelacion/:apelacionId/:apelaTipo', component: apelacionDetails_component_1.ApelacionDetailsAdminComponent },
            { path: 'settingsAdmin', component: settingsAdmin_component_1.SettingsAdminComponent },
            { path: 'usersManage', component: usersManageAdmin_component_1.UsersManageAdminComponent },
            { path: 'perfil', component: userInfoAdmin_component_1.UserInfoAdminComponent }
        ]
    },
    {
        path: 'estudiantes', component: students_component_1.StudentsComponent, children: [
            { path: '', redirectTo: 'inicio', pathMatch: 'full' },
            { path: 'inicio', component: inicio_component_1.InicioComponent },
            { path: 'cursos', component: cursos_component_1.CursosComponent },
            { path: 'formularios/requisitos', component: requisitos_component_1.RequisitosComponent },
            { path: 'formularios/rn', component: rn_component_1.RNComponent },
            { path: 'formularios/inclusiones', component: inclusiones_component_1.InclusionesComponent },
            { path: 'solicitudes', component: solicitudes_component_1.SolicitudesComponent },
            { path: 'solicitudes/:type/:id', component: solicitud_component_1.SolicitudComponent },
            { path: 'perfil', component: perfil_component_1.PerfilComponent },
            { path: 'apelaciones', component: apelaciones_component_1.ApelacionesComponent },
            { path: 'apelaciones/:type/:id', component: apelacion_component_1.ApelacionComponent }
        ]
    },
    {
        path: 'com', component: com_component_1.ComComponent, children: [
            { path: '', redirectTo: 'inicio', pathMatch: 'full' },
            { path: 'inicio', component: inicioCom_component_1.InicioComComponent },
            { path: 'inclusiones', component: inclusionesCom_component_1.InclusionesComComponent },
            { path: 'inclusiones/:inclusionID', component: inclusionDetails_component_2.InclusionesDetailsComComponent },
            { path: 'levantamiento', component: levantamientoCom_component_1.LevantamientoComComponent },
            { path: 'levantamiento/:levantamientoId', component: levantamientoDetails_component_2.LevantamientoDetailsComComponent },
            { path: 'levantamientoRN', component: levantamientoRNCom_component_1.LevantamientoRNComComponent },
            { path: 'levantamientoRN/:levantamientoRNID', component: levantamientoRNDetails_component_2.LevantamientoRNDetailsComComponent },
            { path: 'apelacion', component: apelacionCom_component_1.ApelacionComComponent },
            { path: 'apelacion/:apelacionId/:apelaTipo', component: apelacionDetails_component_2.ApelacionDetailsComComponent },
            { path: 'perfil', component: userInfoCom_component_1.UserInfoComComponent }
        ]
    },
];
//Components to be imported in dashboard modules
exports.MODULE_COMPONENTS = [
    admin_component_1.AdminComponent,
    com_component_1.ComComponent,
    students_component_1.StudentsComponent,
    login_component_1.LoginComponent,
    loginAdCo_component_1.LoginAdCoComponent,
    // UserInfoComponent,
    //Students child
    inicio_component_1.InicioComponent,
    timeline_component_1.TimelineComponent,
    cursos_component_1.CursosComponent,
    requisitos_component_1.RequisitosComponent,
    rn_component_1.RNComponent,
    inclusiones_component_1.InclusionesComponent,
    solicitudes_component_1.SolicitudesComponent,
    solicitud_component_1.SolicitudComponent,
    perfil_component_1.PerfilComponent,
    apelaciones_component_1.ApelacionesComponent,
    apelacion_component_1.ApelacionComponent,
    //Admin child
    inicioAdmin_component_1.InicioAdminComponent,
    estudiantesAdmin_component_1.EstudiantesAdminComponent,
    inclusionesAdmin_component_1.InclusionesAdminComponent,
    levantamientoRNAdmin_component_1.LevantamientoRNAdminComponent,
    levantamientoAdmin_component_1.LevantamientoAdminComponent,
    inclusionDetails_component_1.InclusionesDetailsAdminComponent,
    levantamientoDetails_component_1.LevantamientoDetailsAdminComponent,
    levantamientoRNDetails_component_1.LevantamientoRNDetailsAdminComponent,
    tableNotificaciones_component_1.TableNotificacionesComponent,
    tableEstudiantes_component_1.TableEstudiantesComponent,
    tableInclusiones_component_1.TableInclusionesAdminComponent,
    tableLevantamiento_component_1.TableLevantamientoComponent,
    tableRN_component_1.TableRNComponent,
    settingsAdmin_component_1.SettingsAdminComponent,
    usersManageAdmin_component_1.UsersManageAdminComponent,
    tableUsersAdmin_component_1.TableUsersAdminComponent,
    addUserAdmin_component_1.AddUserAdminComponent,
    addRolAdmin_component_1.AddRolAdminComponent,
    apelacionAdmin_component_1.ApelacionAdminComponent,
    tableApelacion_component_1.TableapelacionAdminComponent,
    apelacionDetails_component_1.ApelacionDetailsAdminComponent,
    userInfoAdmin_component_1.UserInfoAdminComponent,
    // Com child
    inicioCom_component_1.InicioComComponent,
    inclusionesCom_component_1.InclusionesComComponent,
    levantamientoRNCom_component_1.LevantamientoRNComComponent,
    inclusionDetails_component_2.InclusionesDetailsComComponent,
    levantamientoCom_component_1.LevantamientoComComponent,
    levantamientoDetails_component_2.LevantamientoDetailsComComponent,
    levantamientoRNDetails_component_2.LevantamientoRNDetailsComComponent,
    tableNotificaciones_component_2.TableNotificacionesComComponent,
    tableInclusiones_component_2.TableInclusionesComComponent,
    tableLevantamientoCom_component_1.TableLevantamientoComComponent,
    tableRNCom_component_1.TableRNComComponent,
    apelacionCom_component_1.ApelacionComComponent,
    tableApelacion_component_2.TableapelacionComComponent,
    apelacionDetails_component_2.ApelacionDetailsComComponent,
    userInfoCom_component_1.UserInfoComComponent,
    //LoginChild
    estudiantesLogin_component_1.EstudiantesLoginComponent,
    verificacionLogin_component_1.VerificacionLoginComponent
];
//# sourceMappingURL=app.routes.js.map