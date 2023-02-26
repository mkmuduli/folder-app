import {Doc, CreateDoc} from "./doc";

const List = () => {
    return (
        <section className="doc-block" >
            <Doc />
            <Doc type="file" />
            <Doc />
            <Doc type="file" />
            <CreateDoc />
        </section>
    )
}

export default List;