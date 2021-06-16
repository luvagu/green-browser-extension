import axios from 'axios'

// form fields
const form = document.querySelector('.form-data')
const region = document.querySelector('.region-name')
const apiKey = document.querySelector('.api-key')

// results
const errors = document.querySelector('.errors')
const loading = document.querySelector('.loading')
const results = document.querySelector('.result-container')
const usage = document.querySelector('.carbon-usage')
const fossilfuel = document.querySelector('.fossil-fuel')
const myregion = document.querySelector('.my-region')
const clearBtn = document.querySelector('.clear-btn')

// set up api key and region
const setUpUser = async (apiKey, regionName) => {
	localStorage.setItem('apiKey', apiKey)
	localStorage.setItem('regionName', regionName)
	loading.style.display = 'block'
	errors.textContent = ''
	clearBtn.style.display = 'block'
	//make initial call
	displayCarbonUsage(apiKey, regionName)
}

//initial checks
const init = async () => {
	//if anything is in localStorage, pick it up
	const storedApiKey = localStorage.getItem('apiKey')
	const storedRegion = localStorage.getItem('regionName')

	//set icon to be generic green
	chrome.runtime.sendMessage({
		action: 'updateIcon',
		value: {
			color: 'green',
		},
	})

	if (storedApiKey === null || storedRegion === null) {
		//if we don't have the keys, show the form
		form.style.display = 'block'
		results.style.display = 'none'
		loading.style.display = 'none'
		clearBtn.style.display = 'none'
		errors.textContent = ''
	} else {
		//if we have saved keys/regions in localStorage, show results when they load
		results.style.display = 'none'
		form.style.display = 'none'
		displayCarbonUsage(storedApiKey, storedRegion)
		clearBtn.style.display = 'block'
	}
}
