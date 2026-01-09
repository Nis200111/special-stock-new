import * as React from "react"

const Tabs = ({ defaultValue, children, className }) => {
    const [value, setValue] = React.useState(defaultValue);
    return (
        <div className={className}>
            {React.Children.map(children, child =>
                React.cloneElement(child, { value, setValue })
            )}
        </div>
    )
}

const TabsList = ({ children, className, value, setValue }) => (
    <div className={"inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground " + (className || "")}>
        {React.Children.map(children, child =>
            React.cloneElement(child, { active: child.props.value === value, onClick: () => setValue(child.props.value) })
        )}
    </div>
)

const TabsTrigger = ({ children, className, active, onClick }) => (
    <button
        onClick={onClick}
        className={"inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 " + (active ? "bg-background text-foreground shadow" : "") + " " + (className || "")}
    >
        {children}
    </button>
)

const TabsContent = ({ value: activeValue, children, value, className }) => {
    if (activeValue !== value) return null;
    return <div className={"mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " + (className || "")}>{children}</div>
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
