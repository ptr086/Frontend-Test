const data = {
  0: {
    firstName: 'Jan',
    lastName: 'Kowalski',
    company: {
      name: 'Industry LTD',
      address: '20 Williams Circle',
      countryCode: 'UK'
    }
  },
  1: {
    firstName: 'John',
    lastName: 'Smith',
    company: {
      name: 'VxxonMobil',
      address: '770 Cemetery Street',
      countryCode: 'US'
    }
  },
  2: {
    firstName: 'Arnold',
    lastName: 'Blake',
    company: {
      name: 'Washington Wizards',
      address: '4 Old Brook Street',
      countryCode: 'US'
    }
  },
  3: {
    firstName: 'Ann',
    lastName: 'Tayor',
    company: {
      name: 'Ally Financial',
      address: '9 Purple Finch Street',
      countryCode: 'UK'
    }
  }
}

function groupByCountry(input){
	return Object.values(data).reduce(
		(accumulator, currentValue) => { 
			let index = currentValue.company.countryCode;
			if (typeof accumulator[index] === 'undefined') accumulator[index] = [];
			accumulator[index].push(currentValue);
		return accumulator;
		}, 
	{});   	
}

document.getElementById('root').innerHTML = "Input: \n\n"+ JSON.stringify(data, null, "\t") + "\n\n\nOutput: \n\n" +JSON.stringify(groupByCountry(data), null, "\t");
