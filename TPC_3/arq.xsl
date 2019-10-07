<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="xhtml" indent="yes" encoding="UTF-8"/>
    
    <xsl:template match="/">
        <xsl:result-document href="html/index.html">
            <html>
                <head>
                    <title>Arqueossítios do Nordeste Português</title>
                    <meta charset="UTF8"></meta>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
                </head>
                <body>
                    <h1>Arqueossítios do Nordeste Português</h1>
                    <h3>Índice de Arqueossítios</h3>
                    <ol>
                        <xsl:apply-templates mode="indice" />
                    </ol>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a name="{generate-id()}" />
            <a href="arq-{generate-id()}.html"><xsl:value-of select="IDENTI"/></a>
        </li>
    </xsl:template>
    
    <xsl:template match="ARQELEM">
        <xsl:result-document href="html/arq-{generate-id()}.html">
            <html>
                <head>
                    <title>Arqueossítios do Nordeste Português</title>
                    <meta charset="UTF8"></meta>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
                </head>
                <body>
                    <table class="w3-table">
                        <tr>
                            <th>Identificação</th><td><xsl:value-of select="IDENTI"/></td>
                        </tr>
                        <tr>
                            <th>Lugar</th><td><xsl:value-of select="LUGAR"/></td>
                        </tr>
                        <tr>
                            <th>Localização</th><td><xsl:value-of select="FREGUE"/> - <xsl:value-of select="CONCEL"/></td>
                        </tr>
                        <tr>
                            <th>Coordernadas</th><td><xsl:value-of select="LATITU"/> - <xsl:value-of select="LONGIT"/> - <xsl:value-of select="ALTITU"/></td>
                        </tr>
                        <tr>
                            <th>Acesso</th><td><xsl:value-of select="ACESSO"/></td>
                        </tr>
                        <tr>
                            <th>Quadro</th><td><xsl:value-of select="QUADRO"/></td>
                        </tr>
                        <tr>
                            <th>Descrição</th><td><xsl:value-of select="DESARQ"/></td>
                        </tr>
                        <tr>
                            <th>Autor</th><td><xsl:value-of select="AUTOR"/></td>
                        </tr>
                        <tr>
                            <th>Data</th><td><xsl:value-of select="DATA"/></td>
                        </tr>
                    </table>
                    
                    <hr />
                    <address>
                        <a href="index.html#{generate-id()}">Voltar à página principal</a>
                    </address>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
</xsl:stylesheet>