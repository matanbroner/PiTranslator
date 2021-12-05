all: readme.md head.tex
	pandoc readme.md -o PiTranslator_Report.pdf -s --pdf-engine=xelatex -H head.tex -V geometry:"top=1in, bottom=1in, left=1in, right=1in"
	