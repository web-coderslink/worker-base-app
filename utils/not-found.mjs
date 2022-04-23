const notFoundMiddleWare=(req,res)=>{
    res.status(401).send("page not found")
}

export default notFoundMiddleWare;