import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { LabelColorPipe } from './pipes/label-color.pipe';
import { BlogsComponent } from './blogs/blogs.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TagsComponent } from './tags/tags.component';
import { ArchivesComponent } from './archives/archives.component';

@NgModule({
  declarations: [AppComponent, LabelColorPipe, BlogsComponent, ToolbarComponent, TagsComponent, ArchivesComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
