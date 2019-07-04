#IfWinActive ahk_exe DDNet.exe
^!s::Start()
^!p::Pause
^!r::Reload

SetKeyDelay, 100, 100

Start()
{
    Maps := []
    Loop, Read, %A_ScriptDir%\maps.txt
    {
        Maps.Push(A_LoopReadLine)
    }

    for index, element in Maps
    {
        Send t/mapinfo %element%
        Send {Enter}
        Sleep, 3000 ; Avoids getting muted for spamming
    }
}