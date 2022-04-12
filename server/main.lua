QBCore = exports['qb-core']:GetCoreObject()

local isOpen = true
local webhook = ""
xPlayer = QBCore.Functions.GetPlayer(source)


			
--QBCore.Commands.Add('battattx', 'god', function(xPlayer, args, showError)
--	isOpen = not isOpen
--	print(isOpen)
--	if isOpen then
--		TriggerEvent('Notify:adminNotifyAllPlayers', 'Tài xỉu mở', 'adm')
--	else
--		TriggerEvent('Notify:adminNotifyAllPlayers', 'Hết giờ chơi tài xỉu', 'adm')
--	end
--end, true, {help = 'Bật/tắt tài xỉu'})

QBCore.Commands.Add("battattx", "Bật tài xỉu", {}, true, function(xPlayer, showError, source, args)
	isOpen = not isOpen
	print(isOpen)
	local src = source
    for k, v in pairs(QBCore.Functions.GetPlayers()) do
    local Player = QBCore.Functions.GetPlayer(v)
	if isOpen then
		TriggerClientEvent('QBCore:Notify', v, "Tài xỉu mở!!!", "info", 15000)
	else
		TriggerClientEvent('QBCore:Notify', v, "Hết giờ chơi tài xỉu", "info", 15000)
		end
	end
end, 'god')






RegisterServerEvent("taixiu:checkmoney")
AddEventHandler("taixiu:checkmoney", function(dice, money)
	local money = math.floor(money)
	local _source   = source
	--local Player   = XD.Functions.GetPlayer(_source)
	xPlayer = QBCore.Functions.GetPlayer(source)
	if money > 0 and money <= 100000 then
		if xPlayer.Functions.RemoveMoney('cash', money ,"datcuoc") then
			--TriggerClientEvent('taixiu:checkmoney',source,_source, dice, money)
			TriggerEvent('taixiu:pull', _source, dice, money);
			--xPlayer.Functions.RemoveMoney('cash', money ,"datcuoc")
			TriggerClientEvent('QBCore:Notify', source, "Đã đặt "..money.."$")
			SendToDiscord(source, " Đã đặt :  "..dice.." với số tiền "..money.."$")
		else
			TriggerClientEvent('QBCore:Notify', _source, "Bạn không có đủ tiền hoặc số tiền cược phải lớn hơn 0 và đặt tối đa là 100000")
		end
	else
		TriggerClientEvent('QBCore:Notify', _source, "Bạn không có đủ tiền hoặc số tiền cược phải lớn hơn 0 và đặt tối đa là 100000")
	end
end)

--[[ RegisterServerEvent('taixiu:checkthoigian')
AddEventHandler('taixiu:checkthoigian', function(msg)
	if msg.status == 'success' then
		local Player = XD.Functions.GetPlayer(source)
		Player.Functions.RemoveMoney("cash", msg.tiendat, "Đặt tài xỉu")
		TriggerClientEvent('mythic_notify:client:SendAlert', source, "Đã đặt "..msg.tiendat.."$")
	elseif msg.status == 'error' then 
		TriggerClientEvent('mythic_notify:client:SendAlert', source, "Chưa đến phiên tiếp theo, vui lòng chờ giây lát!")
	end
end) ]]
QBCore.Functions.CreateCallback("qt-taixiu:callback:isOpen", function(source, cb, index)
	if isOpen then
		cb(true)
	else
		TriggerClientEvent('QBCore:Notify', source, "~r~Chưa tới giờ chơi tài xỉu")
		cb(false)
	end          
end)
RegisterServerEvent("taixiu:layketqua")
AddEventHandler("taixiu:layketqua", function()
	local _source = source
	
	seed1 = math.random(1, 6)
	seed2 = math.random(1, 6)
	seed3 = math.random(1, 6)
	dice1 = seed1
	dice2 = seed2
	dice3 = seed3


	TriggerClientEvent('taixiu:traketqua', -1, dice1, dice2, dice3)
	Citizen.Wait(30000)
end)

AddEventHandler("taixiu:winGame", function(source, money)
	print(source, money)
	local money = math.floor(money)
	local _source = source
	if GetPlayerName(source) ~= nil then
		local xPlayer1 = QBCore.Functions.GetPlayer(source)
	--	local name = xPlayer1.GetPlayerName
		xPlayer1.Functions.AddMoney('cash',money * 1.8, "Tai xiu")
		local thang = money * 0.8 + money
		SendToDiscord(source, "Chơi tài xỉu và đã thắng được "..thang.."$")
		TriggerClientEvent('QBCore:Notify', _source,	'Bạn chơi tài xỉu và đã thắng được '..thang..'$')
		--TriggerClientEvent('chatMessage', -1, 'TÀI XỈU', { 255, 255, 255 }, '^1* ['..name..' chơi tài xỉu và đã thắng được '..math.ceil(thang)..'$')
	else 
		TriggerClientEvent('QBCore:Notify', source,'Người chơi không tồn tại')
	end

end)

----------------------DISCORD--------------------------------
function SendToDiscord(id, msg)
	local _source = id
	local playername = GetPlayerName(_source)
	local steamid  = 'false'
	local license  = 'false'
	local discord  = 'false'
	local xbl      = 'false'
	local liveid   = 'false'
	local ip       = 'false'
	for k,v in pairs(GetPlayerIdentifiers(_source))do
		if string.sub(v, 1, string.len("steam:")) == "steam:" then
			steamid = v
		elseif string.sub(v, 1, string.len("license:")) == "license:" then
			license = v
		elseif string.sub(v, 1, string.len("xbl:")) == "xbl:" then
			xbl  = v
		elseif string.sub(v, 1, string.len("ip:")) == "ip:" then
			ip = v
		elseif string.sub(v, 1, string.len("discord:")) == "discord:" then
			discord = v
		elseif string.sub(v, 1, string.len("live:")) == "live:" then
			liveid = v
		end
	end
	local connect = {
		{
			["color"] = "8663711",
			["title"] = "Người chơi đặt cược",
			["description"] = "**Người chơi: "..playername.."\n  "..msg.."**",
			["footer"] = {
				["text"] = "Metaverse City",
				["icon_url"] = "",
			},
		}
	}
	PerformHttpRequest(webhook, function(err, text, headers) end, 'POST', json.encode({username = "Tài xỉu", embeds = connect}), { ['Content-Type'] = 'application/json' })
end