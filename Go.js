class Go {
  constructor() {
  }

  getData() {
    const apiCall = async () => {

      let customInit =  { method: 'GET',
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          mode:   'no-cors',
                          cache:  'default'
                        }

      let jsonFile = 'http://127.0.0.1/OCP7/json.json'
      let response = await fetch(jsonFile, customInit)
      data         = await response.json()
      }
    }

}
