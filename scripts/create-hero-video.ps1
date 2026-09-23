param(
    [string]$Ffmpeg = 'ffmpeg',
    [string]$Image = 'hero-harbor.png',
    [string]$Output = 'hero-harbor.mp4'
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$source = Join-Path (Join-Path $projectRoot 'public/images') $Image
$videoDirectory = Join-Path $projectRoot 'public/videos'
$destination = Join-Path $videoDirectory $Output
New-Item -ItemType Directory -Path $videoDirectory -Force | Out-Null
if (-not (Test-Path -LiteralPath $source -PathType Leaf)) { throw "Source image not found: $source" }

# A 12-second periodic camera movement makes the first and last frames meet.
# Scale before zooming for smooth subpixel movement at the delivery resolution.
$videoFilter = "scale=2560:1440:force_original_aspect_ratio=increase,crop=2560:1440,zoompan=z='1.025+0.012*(1-cos(2*PI*on/288))':x='(iw-iw/zoom)*(0.48+0.07*sin(2*PI*on/288))':y='(ih-ih/zoom)*(0.5+0.025*cos(2*PI*on/288))':d=288:s=1280x720:fps=24,format=yuv420p"

& $Ffmpeg -hide_banner -y -i $source -vf $videoFilter -frames:v 288 -an -c:v libx264 -preset slow -crf 23 -movflags +faststart $destination
if ($LASTEXITCODE -ne 0) { throw "Video export failed with exit code $LASTEXITCODE" }
Get-Item -LiteralPath $destination | Select-Object FullName,Length
