import {Helmet} from "react-helmet"

type Prop ={
    title:string
}

const MetaData =({title}:Prop)=>{
    return(
        <Helmet>
            <title>{`${title} -RisingStarAcademy`}</title>
        </Helmet>
    )
}

export default MetaData