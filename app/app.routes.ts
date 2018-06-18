import { Route, RouterModule } from '@angular/router';
import { StudentsComponent } from './students.component';
import { AdminComponent } from './admin.component';
import { ComComponent } from './com.component';
import { InicioComponent } from './dashboard/inicio/inicio.component';
import { TimelineComponent } from './dashboard/inicio/timeline/timeline.component';
import { CursosComponent } from './dashboard/cursos/cursos.component';
import { RequisitosComponent } from './dashboard/formularios/requisitos/requisitos.component';
import { RNComponent } from './dashboard/formularios/rn/rn.component';
import { InclusionesComponent } from './dashboard/formularios/inclusiones/inclusiones.component';
import { SolicitudesComponent } from './dashboard/solicitudes/solicitudes.component';
import { SolicitudComponent } from './dashboard/solicitudes/solicitud.component';
//
import { EstudiantesAdminComponent } from './dashboardAdmin/estudiantesAdmin/estudiantesAdmin.component';
import { InicioAdminComponent } from './dashboardAdmin/inicioAdmin/inicioAdmin.component';
import { InclusionesAdminComponent } from './dashboardAdmin/inclusionesAdmin/inclusionesAdmin.component';
import { LevantamientoRNAdminComponent } from './dashboardAdmin/levantamientoRNAdmin/levantamientoRNAdmin.component';
import { InclusionesDetailsAdminComponent } from './dashboardAdmin/inclusionesAdmin/inclusion/inclusionDetails.component';
import { LevantamientoAdminComponent } from './dashboardAdmin/levantamientoAdmin/levantamientoAdmin.component';
import { LevantamientoDetailsAdminComponent } from './dashboardAdmin/levantamientoAdmin/levantamiento/levantamientoDetails.component';
import { LevantamientoRNDetailsAdminComponent } from './dashboardAdmin/levantamientoRNAdmin/levantamientoRN/levantamientoRNDetails.component';
import { TableNotificacionesComponent } from './dashboardAdmin/inicioAdmin/tableNotificaciones/tableNotificaciones.component';
import { TableEstudiantesComponent } from './dashboardAdmin/estudiantesAdmin/tableEstudiantes/tableEstudiantes.component';
import { TableInclusionesAdminComponent } from './dashboardAdmin/inclusionesAdmin/tableInclusiones/tableInclusiones.component';
import { TableLevantamientoComponent } from './dashboardAdmin/levantamientoAdmin/tableLevantamiento/tableLevantamiento.component';
import { TableUsersAdminComponent } from './dashboardAdmin/usersManageAdmin/tableUsers/tableUsersAdmin.component';
import { TableRNComponent } from './dashboardAdmin/levantamientoRNAdmin/tableRN/tableRN.component';
import { LoginComponent } from './login.component';
import { LoginAdCoComponent } from './loginAdCo/loginAdCo.component';

import { EstudiantesLoginComponent } from './login/estudiantesLogin.component';
import { VerificacionLoginComponent } from './login/verificacionLogin.component';
import { PerfilComponent } from './dashboard/perfil/perfil.component';
import { ApelacionesComponent } from './dashboard/apelaciones/apelaciones.component';
import { ApelacionComponent } from './dashboard/apelaciones/apelacion.component';

import { SettingsAdminComponent } from './dashboardAdmin/settingsAdmin/settingsAdmin.component';
import { UsersManageAdminComponent } from './dashboardAdmin/usersManageAdmin/usersManageAdmin.component'
import { AddUserAdminComponent } from './dashboardAdmin/usersManageAdmin/addUser/addUserAdmin.component';
import { AddRolAdminComponent } from './dashboardAdmin/usersManageAdmin/roles/addRolAdmin.component';

import { ApelacionAdminComponent } from './dashboardAdmin/apelacionesAdmin/apelacionAdmin.component'
import { TableapelacionAdminComponent } from './dashboardAdmin/apelacionesAdmin/tableApelacion/tableApelacion.component';
import { ApelacionDetailsAdminComponent } from './dashboardAdmin/apelacionesAdmin/apelacion/apelacionDetails.component';
import { UserInfoAdminComponent } from './dashboardAdmin/userInfo/userInfoAdmin.component'
//
import { InicioComComponent } from './dashboardCom/inicioCom/inicioCom.component';
import { InclusionesComComponent } from './dashboardCom/inclusionesCom/inclusionesCom.component';
import { LevantamientoRNComComponent } from './dashboardCom/levantamientoRNCom/levantamientoRNCom.component';
import { InclusionesDetailsComComponent } from './dashboardCom/inclusionesCom/inclusion/inclusionDetails.component';
import { LevantamientoComComponent } from './dashboardCom/levantamientoCom/levantamientoCom.component';
import { LevantamientoDetailsComComponent } from './dashboardCom/levantamientoCom/levantamiento/levantamientoDetails.component';
import { LevantamientoRNDetailsComComponent } from './dashboardCom/levantamientoRNCom/levantamientoRN/levantamientoRNDetails.component';
import { TableNotificacionesComComponent } from './dashboardCom/inicioCom/tableNotificaciones/tableNotificaciones.component';
import { TableInclusionesComComponent } from './dashboardCom/inclusionesCom/tableInclusiones/tableInclusiones.component';
import { TableLevantamientoComComponent } from './dashboardCom/levantamientoCom/tableLevantamiento/tableLevantamientoCom.component';
import { TableRNComComponent } from './dashboardCom/levantamientoRNCom/tableRN/tableRNCom.component';

import { ApelacionComComponent } from './dashboardCom/apelacionesCom/apelacionCom.component'
import { TableapelacionComComponent } from './dashboardCom/apelacionesCom/tableApelacion/tableApelacion.component';
import { ApelacionDetailsComComponent } from './dashboardCom/apelacionesCom/apelacion/apelacionDetails.component';

import { UserInfoComComponent } from './dashboardCom/userInfo/userInfoCom.component'

//Routes ti be imported in dashboard modules
export const MODULE_ROUTES: Route[] = [


    { path: '', redirectTo: 'estudiantes', pathMatch: 'full' },
    {
        path: 'login', component: LoginComponent, children: [
            { path: '', redirectTo: 'estudiantes', pathMatch: 'full' },
            { path: 'estudiantes', component: EstudiantesLoginComponent },
            { path: 'verificacion/:id/:email', component: VerificacionLoginComponent },
        ]
        
    },
    {path: 'loginAdCo', component: LoginAdCoComponent},
    // {
    //     path: 'loginAdCo', component: LoginAdCoComponent
    //     // , children: [
    //     //     // { path: '', redirectTo: 'estudiantes', pathMatch: 'full' },
    //     //     { path: 'admin', component: AdminComponent },
    //     //     { path: 'com', component: ComComponent },
    //     // ]
        
    // },
    {
        path: 'admin', component: AdminComponent, children: [
            { path: '', redirectTo: 'inicio', pathMatch: 'full' },
            { path: 'inicio', component: InicioAdminComponent },
            { path: 'estudiantes', component: EstudiantesAdminComponent },
            { path: 'inclusiones', component: InclusionesAdminComponent },
            { path: 'inclusiones/:inclusionID', component: InclusionesDetailsAdminComponent },
            { path: 'levantamiento', component: LevantamientoAdminComponent },
            { path: 'levantamiento/:levantamientoId', component: LevantamientoDetailsAdminComponent },
            { path: 'levantamientoRN', component: LevantamientoRNAdminComponent },
            { path: 'levantamientoRN/:levantamientoRNID', component: LevantamientoRNDetailsAdminComponent },
            { path: 'apelacion', component: ApelacionAdminComponent },
            { path: 'apelacion/:apelacionId/:apelaTipo', component: ApelacionDetailsAdminComponent },
            { path: 'settingsAdmin', component: SettingsAdminComponent },
            { path: 'usersManage', component: UsersManageAdminComponent },
            { path: 'perfil', component: UserInfoAdminComponent }
        ]
    },
    {
        path: 'estudiantes', component: StudentsComponent, children: [
            { path: '', redirectTo: 'inicio', pathMatch: 'full' },
            { path: 'inicio', component: InicioComponent },
            { path: 'cursos', component: CursosComponent },
            { path: 'formularios/requisitos', component: RequisitosComponent },
            { path: 'formularios/rn', component: RNComponent },
            { path: 'formularios/inclusiones', component: InclusionesComponent },
            { path: 'solicitudes', component: SolicitudesComponent },
            { path: 'solicitudes/:type/:id', component: SolicitudComponent },
            { path: 'perfil', component: PerfilComponent },
            { path: 'apelaciones', component: ApelacionesComponent },
            { path: 'apelaciones/:type/:id', component: ApelacionComponent }
            

        ]
    },
    {
        path: 'com', component: ComComponent, children: [
            { path: '', redirectTo: 'inicio', pathMatch: 'full' },
            { path: 'inicio', component: InicioComComponent },
            { path: 'inclusiones', component: InclusionesComComponent },
            { path: 'inclusiones/:inclusionID', component: InclusionesDetailsComComponent },
            { path: 'levantamiento', component: LevantamientoComComponent },
            { path: 'levantamiento/:levantamientoId', component: LevantamientoDetailsComComponent },
            { path: 'levantamientoRN', component: LevantamientoRNComComponent },
            { path: 'levantamientoRN/:levantamientoRNID', component: LevantamientoRNDetailsComComponent },
            { path: 'apelacion', component: ApelacionComComponent },
            { path: 'apelacion/:apelacionId/:apelaTipo', component: ApelacionDetailsComComponent }, 
            { path: 'perfil', component: UserInfoComComponent }
        ]
    },

]

//Components to be imported in dashboard modules
export const MODULE_COMPONENTS = [
    AdminComponent,
    ComComponent,
    StudentsComponent,
    LoginComponent,
    LoginAdCoComponent,
    // UserInfoComponent,
    //Students child
    InicioComponent,
    TimelineComponent,
    CursosComponent,
    RequisitosComponent,
    RNComponent,
    InclusionesComponent,
    SolicitudesComponent,
    SolicitudComponent,
    PerfilComponent,
    ApelacionesComponent,
    ApelacionComponent,
    //Admin child
    InicioAdminComponent,
    EstudiantesAdminComponent,
    InclusionesAdminComponent,
    LevantamientoRNAdminComponent,
    LevantamientoAdminComponent,
    InclusionesDetailsAdminComponent,
    LevantamientoDetailsAdminComponent,
    LevantamientoRNDetailsAdminComponent,
    TableNotificacionesComponent,
    TableEstudiantesComponent,
    TableInclusionesAdminComponent,
    TableLevantamientoComponent,
    TableRNComponent,
    SettingsAdminComponent,
    UsersManageAdminComponent,
    TableUsersAdminComponent,
    AddUserAdminComponent,
    AddRolAdminComponent,
    ApelacionAdminComponent,
    TableapelacionAdminComponent,
    ApelacionDetailsAdminComponent,
    UserInfoAdminComponent,
    // Com child
    InicioComComponent,
    InclusionesComComponent,
    LevantamientoRNComComponent,
    InclusionesDetailsComComponent,
    LevantamientoComComponent,
    LevantamientoDetailsComComponent,
    LevantamientoRNDetailsComComponent,
    TableNotificacionesComComponent,
    TableInclusionesComComponent,
    TableLevantamientoComComponent,
    TableRNComComponent,
    ApelacionComComponent,
    TableapelacionComComponent,
    ApelacionDetailsComComponent,
    UserInfoComComponent,
    //LoginChild
    EstudiantesLoginComponent,
    VerificacionLoginComponent
]
