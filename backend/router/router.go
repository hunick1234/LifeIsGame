package router

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/hunick1234/LIG/middleware/session"
	v1 "github.com/hunick1234/LIG/router/api/v1"
)

func Router() *gin.Engine {

	r := gin.New()

	r.Use(gin.Logger(), Cors(), gin.Recovery(), session.SetSession()) // 日志 , 跨域请求, 錯誤回復

	gin.SetMode(gin.DebugMode)

	apiV1 := r.Group("api/v1")
	user := apiV1.Group("/user")

	apiV1.POST("/login", v1.Login)
	apiV1.POST("/singin", v1.Singin)
	apiV1.GET("/games", v1.GetGameList) //response all game
	apiV1.GET("/games/:gameid", v1.GetGameInfo)

	user.Use(session.AuthSession())
	{
		user.GET("/userInfo", v1.GetUserInfo)
		user.GET("/logout", v1.Logout)
		user.GET("/games", v1.GetUserGameList) //response uer's games\
		user.POST("/games/:gameid", v1.CreatGame)
		user.DELETE("/games/:gameID", v1.DeleteGame) //if user has game delet game else return error
		user.PUT("/games/:gameID/:levelID")
		user.PUT("/games/:gameID/:levelID/senceID")
	}

	return r
}

func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		method := c.Request.Method               //请求方法
		origin := c.Request.Header.Get("Origin") //请求头部
		var headerKeys []string                  // 声明请求头keys
		for k, _ := range c.Request.Header {
			headerKeys = append(headerKeys, k)
		}
		headerStr := strings.Join(headerKeys, ", ")
		if headerStr != "" {
			headerStr = fmt.Sprintf("access-control-allow-origin, access-control-allow-headers, %s", headerStr)
		} else {
			headerStr = "access-control-allow-origin, access-control-allow-headers"
		}
		if origin != "" {
			c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
			c.Header("Access-Control-Allow-Origin", "http://127.0.0.1:3000")                   // 这是允许访问所有域
			c.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE,UPDATE") //服务器支持的所有跨域请求的方法,为了避免浏览次请求的多次'预检'请求
			//  header的类型
			c.Header("Access-Control-Allow-Headers", "Authorization, Content-Length, X-CSRF-Token, Token,session,X_Requested_With,Accept, Origin, Host, Connection, Accept-Encoding, Accept-Language,DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Pragma,Cookie")
			//              允许跨域设置                                                                                                      可以返回其他子段
			c.Header("Access-Control-Expose-Headers", "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers,Cache-Control,Content-Language,Content-Type,Expires,Last-Modified,Pragma,FooBar") // 跨域关键设置 让浏览器可以解析
			c.Header("Access-Control-Max-Age", "172800")                                                                                                                                                           // 缓存请求信息 单位为秒
			c.Header("Access-Control-Allow-Credentials", "true")                                                                                                                                                   //  跨域请求是否需要带cookie信息 默认设置为true
			c.Set("content-type", "application/json")                                                                                                                                                              // 设置返回格式是json
		}

		//放行所有OPTIONS方法
		if method == "OPTIONS" {
			c.JSON(http.StatusOK, "Options Request!")
		}
		c.Next() //  处理请求
	}
}
