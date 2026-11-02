function requestMetaData()
{
	let device = "desktop";
	if ( (/iPhone|iPad|iPod|Android|Mobi/i.test(navigator.userAgent) ) )
	{
		device = "mobile";
	}

	let metadata =
	{
		isQuickStart: true,
		isDebug: false,
		lang: navigator.language.split('-')[0],
		device: device
	};

	myGameInstance.SendMessage( 'Provider', 'RequestMetaDataCallback', JSON.stringify( metadata ) );
}

function requestSaveData( gameID )
{
	let datastring = window.CrazyGames.SDK.data.getItem( gameID );
	if ( datastring != null )
		myGameInstance.SendMessage( 'Provider', 'RequestSaveDataCallback', datastring );
	else
		myGameInstance.SendMessage( 'Provider', 'RequestSaveDataCallback', '' );
}

function setData( gameID, data )
{
	window.CrazyGames.SDK.data.setItem( gameID, data );
	console.log( '[setData] saved' );
}

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

function gameLoadingStart()
{
	window.CrazyGames.SDK.game.loadingStart();
}

function gameLoadingStop()
{
	console.log( '[gameLoadingStop] ready' );
	window.CrazyGames.SDK.game.loadingStop();
}

function preInit()
{
    const hostname = window.location.hostname;
    const parts = hostname.split(".");
    const idx = parts.indexOf("crazygames");
    return idx !== -1 && idx >= parts.length - 3;
}

async function showRewardAd()
{
	const result = await window.CrazyGames.SDK.ad.hasAdblock();
	if ( result )
	{
		console.log( '[showRewardAd] adblock callback' );
		myGameInstance.SendMessage( 'Provider', 'ShowRewardAdOnAdBlock' );
		return;
	}

	window.CrazyGames.SDK.ad.requestAd( "rewarded",
		{
			adFinished: function()
			{
				myGameInstance.SendMessage( 'Provider', 'ShowRewardAdOnRewarded' );
				myGameInstance.SendMessage( 'Provider', 'ShowRewardAdOnClose' );
			},
			adError: function( error )
			{
				console.log( '[showRewardAd] error callback' );
				myGameInstance.SendMessage( 'Provider', 'ShowRewardAdOnError', error.code );
			},
			adStarted: function()
			{
				myGameInstance.SendMessage( 'Provider', 'ShowRewardAdOnOpen' );
			}
		}
	);
}

function showFullscreenAd()
{
	window.CrazyGames.SDK.ad.requestAd("midgame",
		{
			adFinished: function()
			{
				console.log( '[showFullscreenAd] close' );
				myGameInstance.SendMessage( 'Provider', 'ShowFullscreenAdOnClose' );
			},
			adError: function( error )
			{
				console.log( '[showFullscreenAd] error' );
				myGameInstance.SendMessage( 'Provider', 'ShowFullscreenAdOnError' );
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
	// dummy
}

function trackDump( gameName, version, content )
{
	// dummy
}

function setAdLength( seconds )
{
	// dummy
}
