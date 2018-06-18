import { MenuType, RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    { path: 'inicio', title: 'Inicio', menuType: MenuType.LEFT, icon:'material-icons' },
    { path: 'estudiantes', title: 'Listado de estudiantes', menuType: MenuType.LEFT, icon:'material-icons' },
    { path: 'inclusiones', title: 'Listado de solicitudes de inclusiones', menuType: MenuType.LEFT, icon:'material-icons' },
    { path: 'levantamiento', title: 'Listado de solicitudes de levantamiento de requisito', menuType: MenuType.LEFT, icon:'material-icons' },
    { path: 'levantamientoRN', title: 'Listado de solicitudes de levantamiento de RM', menuType: MenuType.LEFT, icon:'material-icons' },
    { path: 'settingsAdmin', title: 'Configuraciones', menuType: MenuType.LEFT, icon:'material-icons' },
    { path: 'usersManage', title: 'Manejo de usuarios', menuType: MenuType.LEFT, icon:'material-icons' },
    { path: 'apelacion', title: 'Listado de solicitudes de apelacion', menuType: MenuType.LEFT, icon:'material-icons' }
];
