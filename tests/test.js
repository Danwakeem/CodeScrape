const nock = require('nock');
const should = require('should');
const scrape = require('../scrape');

const validOutput = `<html><head> <meta http-equiv="content-type" content="text/html; charset=UTF-8"> <meta http-equiv="Pragma" content="no-cache"> <meta http-equiv="Expires" content="-1"> <title>C code- 6 lines - codepad</title> <link href="/code.css" media="screen" rel="stylesheet" type="text/css"> <link href="/main.css" media="screen" rel="stylesheet" type="text/css"> <style type="text/css"> </style></head> <body cz-shortcut-listen="true"> <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom: 1px solid #ccc; margin: 0; width: 100%; padding: 8px 8px 4px 8px;"><tbody><tr> <td style="text-align: left"> <span class="logo"><a href="/">codepad</a></span> <nobr> &nbsp;&nbsp;&nbsp;<span class="menu">[ <a href="/">create a new paste</a>]</span> </nobr> </td><td style="text-align: right"> <nobr> <span class="menu"> <a href="/login">login</a> </span> <span class="menu">|</span> <span class="menu"><a href="/about">about</a></span> </nobr> </td></tr></tbody></table><div style="margin: 8px 8px 8px 8px"> <table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td><br><table cellspacing="0" cellpadding="0" width="100%"><tbody><tr><td> <nobr><span class="heading">Link:</span><span class="menu"> <a href="http://codepad.org/jbBmgwfj">http://codepad.org/jbBmgwfj</a> </span></nobr> <nobr><span class="menu">&nbsp;&nbsp;&nbsp;[<a href="http://codepad.org/jbBmgwfj/raw.c">raw code</a> |<a href="#output">output</a> |<a href="#entry">fork</a>]</span></nobr></td><td style="text-align: right"> <span class="label"> <a href="/jbBmgwfj/save">Save this paste</a> </span><br><span class="label" id="delete-paste"><a href="#" onclick="confirmDelete()">Delete this paste</a></span><script type="text/javascript">function confirmDelete(){document.getElementById('delete-paste').innerHTML='<div class="notice">This will permanently delete this paste.<br/> <b>Are you sure?</b> <a href="/jbBmgwfj/delete">Yes</a> / <a href="#" onclick="cancelDelete()">Cancel</a></div>'; return false;}function cancelDelete(){document.getElementById('delete-paste').innerHTML='<a href="#" onclick="confirmDelete()">Delete this paste</a>'; return false;}cancelDelete();</script></td></tr></tbody></table><br><span class="heading">C</span>,<span class="label">pasted1 second ago:</span><br><div class="code"><table width="100%" border="0" cellpadding="10" cellspacing="0"><tbody><tr><td style="border-right: 1px solid #ccc; text-align: right; vertical-align: top"><div class="highlight"><pre><a style="" name="line-1">1</a><a style="" name="line-2">2</a><a style="" name="line-3">3</a><a style="" name="line-4">4</a><a style="" name="line-5">5</a><a style="" name="line-6">6</a></pre></div></td><td width="100%" style="vertical-align: top"><div class="highlight"><pre><span class="cp">#include<stdio.h></span><span class="kt">int</span> <span class="nf">main</span> <span class="p">()</span> <span class="p">{</span><span class="n">printf</span><span class="p">(</span><span class="s">"HELLO, WORLD!"</span><span class="p">);</span><span class="k">return</span> <span class="mi">0</span><span class="p">;</span><span class="p">}</span></pre></div></td></tr></tbody></table></div><br><br><a name="output"><span class="heading">Output:</span></a><div class="code"><table border="0" cellpadding="10" cellspacing="0"><tbody><tr><td style="border-right: 1px solid #ccc; text-align:right; vertical-align: top"><div class="highlight"><pre><a style="" name="output-line-1">1</a></pre></div></td><td width="100%" style="vertical-align: top"><div class="highlight"><pre>HELLO, WORLD!</pre></div></td></tr></tbody></table></div></td></tr></tbody></table><br><br><a name="entry"><span class="heading">New paste:</span></a><br><div class="editor" id="editor"> <form action="" method="post" id="editor"> <table cellpadding="10" width="1%"> <tbody><tr> <td style="vertical-align: top"><span style="vertical-align:middle" class="label">Language:</span> <select id="lang" name="lang" style="vertical-align:middle"><option selected="selected" value="C">C</option><option value="C++">C++</option><option value="D">D</option><option value="Haskell">Haskell</option><option value="Lua">Lua</option><option value="OCaml">OCaml</option><option value="PHP">PHP</option><option value="Perl">Perl</option><option value="Plain Text">Plain Text</option><option value="Python">Python</option><option value="Ruby">Ruby</option><option value="Scheme">Scheme</option><option value="Tcl">Tcl</option></select> </td></tr><tr> <td style="vertical-align: middle"><textarea id="textarea" name="code" cols="80" rows="15" wrap="off">#include&lt;stdio.h&gt;int main (){printf("HELLO, WORLD!"); return 0;}</textarea></td></tr><tr> <td colspan="2" style="vertical-align: middle; text-align: right"> <table cellspacing="0" cellpadding="0" width="100%"><tbody><tr> <td style="text-align: right;"> <div style="float: right"> <table><tbody><tr> <td> <label style="margin-right:1em"> <input style="vertical-align:middle" type="checkbox" name="private" value="True"><span style="vertical-align:middle" class="label">Private</span> <span class="label" style="font-size:75%;">[<a href="/help/private-pastes" onclick="window.open(this.href, 'new_window', 'height=300, width=400'); return false;">?</a>]</span> </label> </td><td> <label style="margin-right:1em"> <input style="vertical-align:middle" type="checkbox" name="run" value="True" checked="True"><span style="vertical-align:middle" class="label">Run code</span> </label> </td><td style="text-align: right"> <input type="submit" name="submit" value="Submit"> </td></tr></tbody></table> </div></td></tr></tbody></table> </td></tr></tbody></table> </form> </div><script>// Allow the usage of the tab key when typing in the code box, // rather than unfocusing the element. var ta=document.getElementById('textarea'); ta.onkeydown=function(e){// if the key was the tab key, and the browser isn't so // prehistoric that it doesn't support selectionStart / selectionEnd if (e.keyCode===9 && typeof ta.selectionStart !=='undefined'){var startPosition=ta.selectionStart; var endPosition=ta.selectionEnd; // insert spaces ta.value=(ta.value.substring(0, startPosition) + ' ' + ta.value.substring(endPosition, ta.value.length)); // move the cursor to after the inserted spaces ta.selectionStart=ta.selectionEnd=startPosition + 4; // don't unfocus the textarea (the default behaviour of the tab key) return false;}}; // spam catch $(document).ready(function(){$("#editor").attr("action", "/");}); </script><br><br><a name="comments"><span class="heading">Comments:</span></a><p></p><form action="/jbBmgwfj/post" method="post"> <input type="hidden" name="parent" value=""> <table> <tbody><tr> <td> <textarea id="textarea" name="text" cols="50" rows="5"></textarea> </td></tr><tr> <td style="text-align: left"> <input type="submit" name="submit" value="Post Comment"> </td></tr></tbody></table></form><script type="text/javascript">function toggle(id){var el=document.getElementById(id); if (el.style.display !='none'){el.style.display='none';}else{el.style.display='';}}</script></div><script src="/js/prototype-ajax-only.js" type="text/javascript"></script><script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script><script type="text/javascript">var gaJsHost=(("https:"==document.location.protocol) ? "https://ssl." : "http://www.");document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));</script><script src="http://www.google-analytics.com/ga.js" type="text/javascript"></script><script type="text/javascript">var pageTracker=_gat._getTracker("UA-447571-2");pageTracker._initData();pageTracker._trackPageview();</script> </body></html>`;

describe('Testing codepad responses', () => {
  
  describe('parseOutput() should', () => {
    it('grab the output from the pre defined html', () => {
      scrape.parseOutput(validOutput).should.deepEqual({ output: 'HELLO, WORLD!' });
    });
  });

  describe('getRedirect() should', () => {
    let body;

    beforeEach(() => {
      body = {
        form: {
          lang: 'C',
          code: `#include<stdio.h>\n\nint main () {\n   printf(\"HELLO, WORLD!\");\n   return 0;\n}`,
          run: 'True'
        }
      };
    });

    afterEach(() => nock.cleanAll());

    it('get a valid location in the header', () => {
      nock('http://codepad.org')
      .post('/')
      .reply(302, {}, { location: 'http://codepad.org/GhKld89' });

      return scrape.getRedirect(body)
      .then(location => {
        location.should.be.String;
        location.should.match(/http:\/\/codepad.org\/([a-zA-Z0-9])+/);
      });
    });
   
    it('get an error response', () => {
      nock('http://codepad.org')
      .post('/')
      .reply(500, {});

      return scrape.getRedirect(body)
      .then(location => {
        location.should.equal('Error');
      });
    });
  });

  describe('getCompiledHTML() should', () => {
    const url = 'http://codepad.org/GhKld89';

    afterEach(() => nock.cleanAll());

    it('return html for output page', () => {
      nock('http://codepad.org')
      .get('/GhKld89')
      .reply(200, validOutput);

      return scrape.getCompiledHTML(url)
      .then((html) => {
        html.should.be.String();
      });
    });

  });
});