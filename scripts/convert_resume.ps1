$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectDir = Split-Path -Parent $scriptDir
$htmlPath = Join-Path $scriptDir "resume_template.html"
$docxPath = Join-Path $projectDir "Paul-Karonji-Waithaka-Resume.docx"
$pdfPath = Join-Path $projectDir "Paul-Karonji-Waithaka-Resume.pdf"

Write-Host "Converting HTML to DOCX and PDF using Word COM..." -ForegroundColor Cyan
Write-Host "Source HTML: $htmlPath"
Write-Host "Output DOCX: $docxPath"
Write-Host "Output PDF:  $pdfPath"

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = [Microsoft.Office.Interop.Word.WdAlertLevel]::wdAlertsNone

try {
    $doc = $word.Documents.Open($htmlPath)
    
    # Save as .docx format (wdFormatXMLDocument = 16)
    $doc.SaveAs2([string]$docxPath, 16)
    Write-Host "Saved DOCX: $docxPath" -ForegroundColor Green

    # 17 = wdExportFormatPDF
    $doc.ExportAsFixedFormat([string]$pdfPath, 17)
    Write-Host "Exported PDF: $pdfPath" -ForegroundColor Green

    $doc.Close([ref]$false)
    Write-Host "SUCCESS: Resume generation complete." -ForegroundColor Green
} catch {
    Write-Host "ERROR converting resume: $_" -ForegroundColor Red
    exit 1
} finally {
    $word.Quit()
    [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
}
