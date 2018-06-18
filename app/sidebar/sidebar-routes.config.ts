import { MenuType, RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    { path: 'inicio', title: 'Inicio', menuType: MenuType.LEFT, icon:'material-icons' },
    { path: 'cursos', title: 'Plan de Cursos', menuType: MenuType.LEFT, icon:'pe-7s-news-paper' },    
    { path: 'formularios/requisitos', title: 'Levantamiento de Requisitos', menuType: MenuType.LEFT, icon:'pe-7s-note2' },
    { path: 'formularios/rn', title: 'Levantamiento de RN', menuType: MenuType.LEFT, icon:'pe-7s-note2' },
    { path: 'formularios/inclusiones', title: 'Inclusiones', menuType: MenuType.LEFT, icon:'pe-7s-note2' },
    { path: 'solicitudes', title: 'Solicitudes', menuType: MenuType.LEFT, icon:'pe-7s-note2' },
    { path: 'perfil', title: 'Perfil', menuType: MenuType.LEFT, icon:'pe-7s-note2' },
    { path: 'apelaciones', title: 'Apelaciones', menuType: MenuType.LEFT, icon:'pe-7s-note2' }
    
];
