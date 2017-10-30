import os
import sys


def getMdHeader( name ):
   return """---
permalink: /preview-components/""" + name + """/
layout: base
title: """ + name[:1].upper() + name[1:] + """
---

"""

print("SCRIPT STARTED")

fileNames = os.listdir(sys.argv[1])

for fileName in fileNames:
	if fileName.endswith(".html"):
		print("Processing: " + fileName)
		with open(fileName,'r', encoding="utf8") as inputFile:
			readData = inputFile.read()
			name = fileName[:-5]
			resName = name + ".md"
			with open(resName,'w', encoding="utf8") as outFile:
				outFile.write(getMdHeader(name) + readData)

print("SCRIPT FINISHED")
