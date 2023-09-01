import fetch from 'node-fetch';

const url = 'https://youtube-v31.p.rapidapi.com/search?channelId=UC5UMHwor07bkOxThNvrv4xg&part=snippet%2Cid&order=date&maxResults=10';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '7f9957d316mshe8a676c0e954363p1bb84fjsn6c7ee451e234',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}