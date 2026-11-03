function gameplayStart()
{
	window.CrazyGames.SDK.game.gameplayStart();
}

function gameplayStop()
{
	window.CrazyGames.SDK.game.gameplayStop();
}

function happyTime()
{
	window.CrazyGames.SDK.game.happytime();
}

function setGameStartLoading()
{
	window.CrazyGames.SDK.game.loadingStart();
}

function setGameLoaded()
{
	console.log( '[setGameLoaded] ready' );
	window.CrazyGames.SDK.game.loadingStop();
}

function getLanguage()
{
	myGameInstance.SendMessage( 'Webgl', 'GetLanguageCallback', navigator.language );
}

function getMetaData()
{
	//dummy
}

function getDevice()
{
	let data = "desktop";
	if ( (/iPhone|iPad|iPod|Android|Mobi/i.test(navigator.userAgent) ) )
	{
		data = "mobile";
	}
	myGameInstance.SendMessage( 'Webgl', 'GetDeviceCallback', data );
}

function providerSpecificsInitialize()
{
	let data =
	{
		isQuickStart: true,
		debug: false,
	};
	myGameInstance.SendMessage( 'Webgl', 'ProviderSpecificsInitialize', JSON.stringify( data ) );
}

function getPlayerData()
{
	//let localStr = localStorage.getItem( 'hg_max_data' );
	let localStr = null;
	let localData = null;
	if ( localStr != null )
	{
		try
		{
			localData = JSON.parse( localStr );
			console.log( '[getPlayerData] localStorage successfully parsed!' );
		}
		catch
		{
			localData = null;
			console.log( '[getPlayerData] error parsing localStorage' );
		}
	}

	let datastring = window.CrazyGames.SDK.data.getItem( "hg_max_data" );
	let data = null;
	if ( datastring != null )
	{
		data = JSON.parse( datastring );
	}

	let pickedData = PickData( localData, data );
	if ( pickedData == localData )
	{
		console.log( '[getPlayerData] picked local data' );
	}
	else
	{
		console.log( '[getPlayerData] picked cloud data' );
	}

	let base64string = GetDataBase64( pickedData );
	myGameInstance.SendMessage( 'Webgl', 'GetPlayerDataCallback', base64string );
}

function GetDataBase64( data )
{
	if ( IsDataValid( data ) )
		return data.base64;
	else
		return '';
}

function IsDataValid( data )
{
	return ( data != null && Object.keys(data).length > 0 && "base64" in data );
}

function PickData( local, cloud )
{
	if ( !IsDataValid( local ) )
	{
		return cloud;
	}

	if ( !IsDataValid( cloud ) )
	{
		return local;
	}

	let cloudTimestamp = 0;
	if ( "timestamp" in cloud )
	{
		cloudTimestamp = cloud.timestamp;
	}
	console.log( '[getPlayerData][PickData] local.timestamp: ' + local.timestamp );	//
	console.log( '[getPlayerData][PickData] cloud.timestamp: ' + cloudTimestamp );	//
	if ( local.timestamp > cloudTimestamp )
	{
		return local;
	}
	else
	{
		console.log( '[getPlayerData][PickData] local data is outdated' );	//
		return cloud;
	}
}

function setPlayerData( gameName, version, base64 )
{
	let data =
	{
		timestamp: getTimestampInSeconds(),
		base64: base64
	};

	let stringifyed = JSON.stringify( data );

	//localStorage.setItem( 'hg_max_data', stringifyed );
	window.CrazyGames.SDK.data.setItem( "hg_max_data", stringifyed );

	console.log( '[setPlayerData] saved to cloud' );
}

async function showRewardAd()
{
	const result = await window.CrazyGames.SDK.ad.hasAdblock();
	if ( result )
	{
		console.log( '[showRewardAd] adblock callback' );
		myGameInstance.SendMessage( 'Webgl', 'ShowRewardAdOnAdBlock' );
		return;
	}

	window.CrazyGames.SDK.ad.requestAd("rewarded",
		{
			adFinished: function()
			{
				myGameInstance.SendMessage( 'Webgl', 'ShowRewardAdOnRewarded' );
				myGameInstance.SendMessage( 'Webgl', 'ShowRewardAdOnClose' );
			},
			adError: function( error )
			{
				console.log( '[showRewardAd] error callback' );
				myGameInstance.SendMessage( 'Webgl', 'ShowRewardAdOnError' );
			},
			adStarted: function()
			{
				myGameInstance.SendMessage( 'Webgl', 'ShowRewardAdOnOpen' );
			}
		}
	);
}

function preInit()
{
	return window.location.origin.endsWith("crazygames.com");
}

function showFullscreenAd()
{
	window.CrazyGames.SDK.ad.requestAd("midgame",
		{
			adFinished: function()
			{
				console.log( '[showFullscreenAd] close' );
				myGameInstance.SendMessage( 'Webgl', 'ShowFullscreenAdOnClose' );
			},
			adError: function( error )
			{
				console.log( '[showFullscreenAd] error' );
				myGameInstance.SendMessage( 'Webgl', 'ShowFullscreenAdOnError' );
			},
			adStarted: function()
			{
				//dummy
			}
		}
	);
}

function trackEvent( gameName, version, eventName, data )
{
	//
}

function trackDump( gameName, version, content )
{
	//
}

function setAdLength( seconds )
{
	//
}
