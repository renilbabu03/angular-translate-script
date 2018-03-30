/**
 * Explores recursively a directory and returns all the filepaths and folderpaths in the callback.
 * 
 * @see http://stackoverflow.com/a/5827895/4241030
 * @param {String} dir 
 * @param {Function} done 
 */

const fs = require('fs');
const path = require('path');

function filewalker(dir, done) {
    let results = [];

    fs.readdir(dir, function(err, list) {
        if (err) return done(err);

        var pending = list.length;

        if (!pending) return done(null, results);

        list.forEach(function(file) {
            file = path.resolve(dir, file);

            fs.stat(file, function(err, stat) {
                // If directory, execute a recursive call
                if (stat && stat.isDirectory()) {
                    // Add directory to array [comment if you need to remove the directories from the array]
                    results.push(file);

                    filewalker(file, function(err, res) {
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    results.push(file);

                    if (!--pending) done(null, results);
                }
            });
        });
    });
};
//To do <div class="modal-body">
      //   Do you really want to delete this ?
// </div>
//              <label class="control-label col-sm-4">Phone Number :
//                <span>{{"SORRY,_USERNAME_AND_PASSWORD_ARE_INCORRECT_-_PLEASE_TRY_AGAIN." | translate }}</span>
// <p class="note-info">English is default language of the system. You may activate/deactivate more languages. It will give your employee multi-lingual
    // preference option and they could set their preferred language. For more languages contact Field Star Team at
    // <a href="mailto:support@fieldstar.com">support@fieldstar.com</a>.</p>
    //<b>Note:</b> This date time format will be used in all Templates, Tables, Scheduler, Calendar and other associated sections

filewalker("/home/renil/field/src/app/", function(err, data) {
    if (err) {
        throw err;
    }

    // ["c://some-existent-path/file.txt","c:/some-existent-path/subfolder"]
    // console.log(data.length);
    var html = [];
    var htmlRegex = new RegExp(/.*\.html/);
    for (var i = 0; i < data.length; i++) {
        if (htmlRegex.test(data[i])) {
            html.push(data[i])
        }
    }

    html.forEach((file, i) => {
        var obj = ``;
        var txt_tag = new RegExp(/>(.*?)</g);
        var paranthesisReg = new RegExp(/{{|}}|\*/g);
        fs.readFileSync(file).toString().split('\n').forEach(
            function(line) {
                var old_line = line;
                if (line.match(txt_tag)) {
                    
                    line.match(txt_tag).forEach(match => {
                        if (!match.match(paranthesisReg)) {
                            var match_var = match;
                            match_var = match_var.replace(new RegExp(/>/, 'g'), '');
                            match_var = match_var.replace(new RegExp(/</, 'g'), '');
                            if (match_var.trim().length > 0) {
                                var replacementString = '{{"' + match_var.trim().split(' ').join('_').toUpperCase() + '" | translate }}'
                                fs.appendFile('log.json', '"'+match_var.trim().split(' ').join('_').toUpperCase()+'"' +':'+'"'+match_var.trim()+ '",\n', function(err) {
                                    if (err) throw err;
                                });
                                old_line = old_line.replace(match, '>'+replacementString+'<')

                            }
                        }
                    })
                }

                obj = obj + old_line + '\n';

            }
        );
        // console.log()
        fs.writeFile(file, obj, function(err) {
            if (err) {
                return console.log(err);
            }

            // console.log("The file was saved!");
        });
    })
    // console.log(html)
});