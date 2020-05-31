'use strict';
const loader = require('./loader');
const Client = loader.client;
Client.connect();

function fetchOOpartsGames(order = 'default') {
  return new Promise((resolve, reject) => {
    const sqlFetchOopartsGames = {
      orderColumn: order,
      params : ['1900-01-01','2050-01-01'],
      sql : function(){
        let order;
        if(this.orderColumn === 'releaseDate') {
          order = 'o.release_date DESC';
        } else {
          order = 'g.median DESC NULLS LAST';
        }
        let sql = null;
        sql = `
    SELECT
        g.id AS game_id
        ,g.gamename
        ,g.model
        ,g.erogame
        ,g.sellday
        ,g.shoukai
        ,g.median
        ,g.count2 AS COUNT
        ,g.stdev AS stddev
        ,b.id AS brand_id
        ,b.brandname
        ,b.kind
        ,b.lost
        ,b.kind
        ,o.id AS ooparts_id
        ,o.release_date::date::TEXT AS release_date
    FROM
        gamelist g
        INNER JOIN
            brandlist b
        ON  g.brandname = b.id
        INNER JOIN
            ooparts_game og
        ON  g.id = og.game
        INNER JOIN
            ooparts o
        ON  o.id = og.ooparts
    WHERE
        1 = 1
    AND g.sellday >= $1
    AND g.sellday <= $2
    AND o.closing_date > NOW()
    ORDER BY    
        ` + order + `
        ,g.median DESC NULLS LAST
        ,g.count2 DESC NULLS LAST
        ,g.stdev DESC NULLS LAST
        ,g.id
        `;
        return sql;
      }
    }
    Client.query(sqlFetchOopartsGames.sql(), sqlFetchOopartsGames.params, (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        //console.log(res);
        let Games;
        Games = res.rows;
        resolve(Games);
      }
    });
  })
}

module.exports = { fetchOOpartsGames };
