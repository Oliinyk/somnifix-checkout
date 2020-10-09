<h1>About</h1>
Frontend workspace:
* download dependencies (css/js/components)
* watch changes (**f.**) on fly and livereload pages (**e.**)
* js: generate custom bootstrap.js (i.e. keep only used modules in project), concatenation all js files into one minified file (**g.** and **b.**)
* css: compilation scss to css with vendor prefixes (**c.**), concatenation all css files into one minified file (**g.** and **k.**), extracts & inlines critical (above-the-fold) CSS to html (**l.**)
* images: image optimization (**i.**), convertation png/jpg into webp (**d.**)
<br>



<h1>Quick start<sup>*</sup></h1>
1. `npm i` - install npm packages (required one time PER PROJECT)
3. `gulp` - run default task (development), `gulp production` - production for to test, `gulp production_live` - production server.
 <br>   * step 0: must be installed https://nodejs.org/ and gulp globally (npm install gulp -g)  - in case if it has not been installed yet - required one time PER MACHINE.



<h1>Plugins and custom css/js.</h1>
Plugins/components loads via `npm i`, listed here **package.json**.  
All plugins styles listed in the file **plugins.scss** as imports (if .scss missing - it's available to import .css like .scss).  
All plugins scripts listed in the file **list_plugins.js**. In this file available to select bootstrap components.  
Custom css/js placed to style.css/script.js.  
Generated files included into header between comments < !-- build:... --> - see below:
```html
<!-- build:css assets/css/all.css -->
<link rel="stylesheet" href="assets/css/plugins.css">
<link rel="stylesheet" href="assets/css/style.css">
<!-- endbuild -->
<!-- build:js assets/js/all.js defer -->
<script src="assets/js/plugins.js"></script>
<script src="assets/js/script.js"></script>
<!-- endbuild -->
```


<h1>gulpfile.js</h1>
**Common tasks** - includes to all groups:<br>
**a.** `clean:dist` - clean production (dist) folder  
**b.** `pluginsScripts` - concatenate plugins js, select bootstrap modules  
**c.** `sass` - compilation scss to css  
**d.** `imageToWebp` - convertation png/jpg into webp  

**Development only tasks** (`gulp`)  
**e.** `browserSync` - livereload pages on changes  
**f.** `watch` - watch changes template/js/scss/images  

**Production only tasks** (`gulp production`)  
**g.** `useref` - concatenation all css/js files into one minified file  
**h.** `jsNoCombined` - copy separatelly files into dist (needed when you have js files not for all pages)  
**i.** `images` - image optimization  
**j.** `fonts` - copy fonts into dist  
**k.** `minify` - minify css files  
**l.** `critical` - extracts & inlines critical (above-the-fold) CSS to html  


**Production for live only task** (`gulp production_live`)  
**m.** `generateHeaderLive` - remove < meta name="robots" content="noindex,nofollow"> from code  

<h1>config.js</h1>
**var devPaths** and **var distPaths** - PATH for folder/files - relative to gulpfile.js  
**var sync** - https://browsersync.io/  
**var settingsAutoprefixer** - browserlist for prefixes, https://github.com/ai/browserslist  
**var critical** - critical css settings: ignore css (even if exist in above-the-fold content) or include css (even if no in above-the-fold content)