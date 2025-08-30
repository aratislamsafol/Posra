import { useLoaderData } from "react-router-dom";

const Root = () => {
    const {ProductCategoryList} = useLoaderData();
    console.log(ProductCategoryList);
    return (
        <div className='w-full max-w-[1440px] bg-green-600 mx-auto'>
            <div>this is header</div>
             <div>this is content</div>
            <div>this is footer</div>
        </div>
    )
}

export default Root;