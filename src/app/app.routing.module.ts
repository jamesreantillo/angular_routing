import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { UsersComponent } from 'src/app/users/users.component';
import { UserComponent } from 'src/app/users/user/user.component';
import { ServersComponent } from 'src/app/servers/servers.component';
import { ServerComponent } from 'src/app/servers/server/server.component';
import { EditServerComponent } from 'src/app/servers/edit-server/edit-server.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';
import { AuthGuard } from 'src/app/auth-guard.service';
import { CanDeactivateGuard } from 'src/app/servers/edit-server/can-deactivate-guard.service';
import { ErrorPageComponent } from 'src/app/error-page/error-page.component';
import { ServerResolver } from 'src/app/servers/server/server-resolver.service';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UsersComponent, children: [
    {path: ':id/:name', component: UserComponent}
  ]},
  {path: 'servers',
  // canActivate: [AuthGuard],
  canActivateChild: [AuthGuard],
  component: ServersComponent, children: [
      {path: ':id', component: ServerComponent, resolve: { server: ServerResolver }},
      {path: ':id/edit', canDeactivate: [CanDeactivateGuard], component: EditServerComponent}
  ]},
  // {path: 'not-found', component: PageNotFoundComponent},
    {path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'}},
    {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
