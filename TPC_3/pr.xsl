<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="xhtml" indent="yes" encoding="UTF-8"/>
    
    <xsl:template match="/">
        <xsl:result-document href="pr.html">
            <html>
                <head>
                    <title>PR TPC nº 3</title>
                    <meta charset="UTF8"></meta>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
                </head>
                <body>
                    <h1>Project Record</h1>
                    <p>
                        <b>Key Name</b>: <xsl:value-of select="/pr/metadata/keyname"/>
                        <b>Begin Date</b>: <xsl:value-of select="/pr/metadata/bdate"/>
                    </p>
                    <p>
                        <b>Title</b>: <xsl:value-of select="/pr/metadata/title"/>
                        <b>End Date</b>: <xsl:value-of select="/pr/metadata/edate"/>
                    </p>
                    <p>
                        <b>Subtitle</b>: <xsl:value-of select="/pr/metadata/subtitle"/>
                        <xsl:apply-templates select="/pr/metadata/supervisor"/>
                    </p>
                    <hr />
                    <h2>Work Team</h2>
                    <xsl:apply-templates mode="worker"/>
                    <hr/>
                    <h2>Abstract</h2>
                    <xsl:apply-templates mode="abstract"/>
                    <h2>Deliverables</h2>
                    <xsl:apply-templates mode="deliverables"/>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    
    <xsl:template match="/pr/metadata/supervisor">
        <b>SuperVisor</b>: <a href="{@homepage}"><xsl:value-of select="/pr/metadata/supervisor"/></a>
    </xsl:template>
    
    <xsl:template match="pr" mode="worker">
        <table>
            <tr>
                <th>Nº Aluno</th> <td><xsl:value-of select="/pr/workteam/worker/identifier"/></td>
            </tr>
            <tr>
                <th>Nome</th> <td><xsl:value-of select="/pr/workteam/worker/name"/></td>
            </tr>
            <tr>
                <th>Email</th> <td><xsl:value-of select="/pr/workteam/worker/email"/></td>
            </tr>
            <tr>
                <th>GitHub</th> <td><a href="{/pr/workteam/worker/git}"><xsl:value-of select="/pr/workteam/worker/git"/></a></td>
            </tr>
        </table>
    </xsl:template>
    
    <xsl:template match="pr" mode="abstract">
        <xsl:value-of select="/pr/abstract/p"/>
    </xsl:template>
    
    <xsl:template match="pr" mode="deliverables">
        <a href="{//@path}"><xsl:value-of select="/pr/deliverables/deliverable"/></a>
    </xsl:template>
    
</xsl:stylesheet>