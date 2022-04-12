resource_manifest_version '44febabe-d386-4d18-afbe-5e627f4af937'

description 'QT Developer || Convert by trungkienmvp#8869'

version '1.0.0'



client_script {'client/main.lua',
				}


server_script {'server/main.lua',
				'html/index.js',
				}

ui_page 'html/index.html'

files {
	'html/index.html',
	'html/index.js',
	'html/app.js',
	'html/style.css',
	'html/imgs/dice.png',
	'html/imgs/img.png',
	'html/imgs/roll1.gif',
	'html/imgs/den.png',
	'html/imgs/trang.png',
}
