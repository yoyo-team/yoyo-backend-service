let db=global.vars.db;
let formidable=require('formidable');
let path=require('path');
let tear_down = require('/web/server/java/yoyo');

module.exports.post=function(req,res)
{
    if(req.method.toLocaleLowerCase()!=='post')
    {
        res.status(200).json({status:'not_using_post'});
    }
    else
    {
        let form=new formidable.IncomingForm();
        form.uploadDir=path.resolve('./tmp');
        form.keepExtensions=true;
        // form.on('error',function(err)
        // {
        //     console.log(err);
        //     res.status(200).json
        //     (
        //         {
        //             status:'formidable_error'
        //         }
        //     )
        // });
        // form.on('progress',function(rec,exp)
        // {
        //     console.log('progress');
        //     console.log(rec);
        //     console.log(exp);
        // });
        // form.on('field',function(name,value)
        // {
        //     console.log('field');
        //     console.log(name);
        //     console.log(value);
        // });
        // form.on('fileBegin',function(file,name)
        // {
        //     console.log('file begin');
        //     console.log(file);
        //     console.log(name);
        // });
        // form.on('file',function(file,name)
        // {
        //     console.log('file');
        //     console.log(file);
        //     console.log(name);
        // });
        // form.on('aborted',function()
        // {
        //     console.log('abort');
        // });
        // form.on('end',function()
        // {
        //     console.log('end');
        // });
        form.parse(req,function(err,fields,files)
        {
            if(err)
            {
                console.log(err);
                res.status(200).json
                (
                    {
                        status:'form_parse_error'
                    }
                )
            }
            else
            {
                if(!fields.name)
                {
                    res.status(200).json
                    (
                        {
                            status:'no_name'
                        }
                    );
                    return ;
                }
                if(!fields.releaser)
                {
                    res.status(200).json
                    (
                        {
                            status:'no_releaser'
                        }
                    );
                    return ;
                }
                if(!fields.location)
                {
                    res.status(200).json
                    (
                        {
                            status:'no_location'
                        }
                    );
                    return ;
                }
                if(!files)
                {
                    res.status(200).json
                    (
                        {
                            status:'no_file'
                        }
                    );
                    return ;
                }
                let cid=build_cid();
                console.log(files.file.path);
                if(files.file.name.split('.').pop()!=='ppt' && files.file.name.split('.').pop()!=='pptx')
                {
                    res.status(200).json
                    (
                        {
                            status:'not_a_ppt(x)_file'
                        }
                    );
                    return ;
                }
                tear_down(files.file.path,cid)
                    .then(function(stdout)
                    {
                        let sql=`insert into yoyo.class 
                        (cid, name, location, releaser) 
                        values 
                        ('${cid}','${fields.name}','${fields.location}','${fields.releaser}'); `;
                        console.log(sql);
                        db.query(sql,function(err,result)
                        {
                            if(err)
                            {
                                console.log(err);
                                res.status(200).json
                                (
                                    {
                                        status:'db_error'
                                    }
                                )
                            }
                            else
                            {
                                if(result.affectedRows===1)
                                {
                                    res.status(200).json
                                    (
                                        {
                                            status:'ok'
                                        }
                                    )
                                }
                                else
                                {
                                    console.log('发布课程失败 : ');
                                    console.log(result);
                                    res.status(200).json
                                    (
                                        {
                                            status:'failed'
                                        }
                                    )
                                }
                            }
                        });
                    },function(err)
                    {
                        console.log(err);
                        res.status(200).json
                        (
                            {
                                status:'tear_down_error'
                            }
                        )
                    })
                ;
            }
        });
    }
};

module.exports.get=function(req,res)
{
    res.status(200).json({status:'use_post'});
};

function build_cid()
{
    let str='';
    while(str.length<17)
    {
        str+=(new Date().getTime()+Math.random()*1e20).toString(36);
    }
    return str.substr(0,16);
}