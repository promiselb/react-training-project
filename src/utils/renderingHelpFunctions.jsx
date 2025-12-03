import { Link } from "react-router-dom";

const print_array_itemsIdsProfilePage = (array_itemsIds) => {
        if (!array_itemsIds || array_itemsIds.length === 0) return "None";
        if (array_itemsIds.length === 1) return(
            <Link
                to={`/items/${array_itemsIds[0]}`}
                className="text-blue-600 hover:underline"
            >
                {array_itemsIds[0]}
            </Link>
        )

        return array_itemsIds.map((itemId, index) => {
            return (
                <Link
                    key={itemId}
                    to={`/items/${itemId}`}
                    className="text-blue-600 hover:underline mr-2"
                >
                    {index < array_itemsIds.length - 1 ? `${itemId},` : itemId}
                </Link>
            )
        })
    }

const print_array_itemsIds_DashboardPage = (array_itemsIds) => {
        if (!array_itemsIds || array_itemsIds.length === 0) return "None";
        if (array_itemsIds.length === 1) return(
            <Link
                to={`/dashboard/inventory/${array_itemsIds[0]}`}
                className="text-blue-600 hover:underline"
            >
                {array_itemsIds[0]}
            </Link>
        )

        return array_itemsIds.map((itemId, index) => {
            return (
                <Link
                    key={itemId}
                    to={`/dashboard/inventory/${itemId}`}
                    className="text-blue-600 hover:underline mr-2"
                >
                    {index < array_itemsIds.length - 1 ? `${itemId},` : itemId}
                </Link>
            )
        })
    }

export { print_array_itemsIds_DashboardPage, print_array_itemsIdsProfilePage };