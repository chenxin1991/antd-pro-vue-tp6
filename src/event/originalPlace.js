import jsonp from 'fetch-jsonp'
// 搜索地址接口
const fetch = function (value, callback) {
  if (timeout) {
    clearTimeout(timeout)
    timeout = null
  }

const fake = function () {
    jsonp(
      'https://apis.map.qq.com/ws/place/v1/suggestion/?region=深圳&region_fix=0&output=jsonp&keyword=' +
        value +
        '&key=OI7BZ-EGOWU-H5YVZ-4HLVW-MDUUQ-ZCFGJ'
    )
      .then(response => response.json())
      .then(d => {
        const result = d.data
        const data = []
        result.forEach(r => {
          if (!r.address.includes(r.province)) {
            if (r.address.hasOwnProperty('district')) {
              r.address = r.province + r.city + r.district + r.address
            } else {
              r.address = r.province + r.city + r.address
            }
          }
          data.push({
            id: r.id,
            title: r.title,
            province: r.province,
            city: r.city,
            district: r.district,
            location: JSON.stringify(r.location),
            address: r.address
          })
        })
        callback(data)
      })
  }

  timeout = setTimeout(fake, 300)
}

// 返回多点间导航距离
 const distance = function (value, callback) {
  let from = ''
  let to = ''
  let waypoints = ''
  let url = ''
  let distance = 0
  value.forEach(r => {
    const location = JSON.parse(r.location)
    if (r.key === 0) {
      from = location.lat + ',' + location.lng
    } else if (r.key === 1) {
      to = location.lat + ',' + location.lng
    } else {
      if (waypoints) {
        waypoints = waypoints + ';' + location.lat + ',' + location.lng
      } else {
        waypoints = location.lat + ',' + location.lng
      }
    }
  })

  if (from && to) {
    url =
      'https://apis.map.qq.com/ws/direction/v1/driving/?from=' +
      from +
      '&to=' +
      to +
      '&output=jsonp&key=OI7BZ-EGOWU-H5YVZ-4HLVW-MDUUQ-ZCFGJ'
    if (waypoints) {
      url = url + '&waypoints=' + waypoints
    }
    jsonp(url)
      .then(response => response.json())
      .then(d => {
        if (d.status === 0) {
          const route = d.result.routes[0]
          distance = Math.round(route.distance / 1000)
          callback(distance)
        } else {
          callback(distance)
        }
      })
      .catch(err => {
        console.log(err)
        callback(distance)
      })
  }
}

let timeout

export {
  fetch,
  distance
}
