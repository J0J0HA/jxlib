<script lang="ts">
    import {
        Row,
        Button,
        Input,
        Center,
        FIcon,
        Column,
        Rule,
        Spacer,
        Select,
    } from "$lib/index.js";
    import Tab from "$lib/misc/Tab.svelte";
    import Tabs from "$lib/misc/Tabs.svelte";
    import LoadDefaultTheme from "$lib/themes/DefaultTheme.svelte";

    let simultype = $state("");
    let select = $state("opt-a");
    let loading = $state(false);
    let themeColor = $state("teal");
</script>

<LoadDefaultTheme {themeColor} />

<div class="wrapper">
    <Center fh fw>
        <Input
            type="month"
            id="theme-color-selector"
            name="themeColor"
            bind:value={themeColor}
        />
        <Tabs
            name="tab"
            tabs={{
                tab1: { label: "Tab 1", icon: "send" },
                tab2: { label: "Tab 2", icon: "bar-chart", disabled: true },
                tab3: { label: "Tab 3", icon: "alert-triangle", danger: true },
            }}
            fw
        >
            <Tab key="tab1">
                <Row fw>
                    <FIcon icon="send" />
                    <FIcon icon="alert-triangle" blinking />
                    <FIcon icon="refresh-cw" rotating />
                </Row>
                <p>This is some basic text content.</p>
            </Tab>
            <Tab key="tab2">
                <Row fw>
                    <FIcon icon="send" />
                    <FIcon icon="alert-triangle" blinking />
                    <FIcon icon="refresh-cw" rotating />
                </Row>
            </Tab>
            <Tab key="tab3">
                <Row fw>
                    <FIcon icon="refresh-cw" rotating />
                    <FIcon icon="alert-triangle" blinking />
                    <FIcon icon="send" />
                </Row>
                <Row fw>
                    <FIcon icon="refresh-cw" rotating />
                    <FIcon icon="alert-triangle" blinking />
                    <FIcon icon="send" />
                </Row>
                <Row fw>
                    <FIcon icon="refresh-cw" rotating />
                    <FIcon icon="alert-triangle" blinking />
                    <FIcon icon="send" />
                </Row>
                <Row fw>
                    <FIcon icon="refresh-cw" rotating />
                    <FIcon icon="alert-triangle" blinking />
                    <FIcon icon="send" />
                </Row>
            </Tab>
        </Tabs>
        <Rule m=".5em" />
        <Row fw>
            <Column fw>
                <Row fw>
                    <Button icon="send">Primary</Button>
                    <Button secondary>Secondary</Button>
                    <Button danger icon="trash">Danger</Button>
                    <Button secondary danger icon="trash"
                        >Secondary danger</Button
                    >
                </Row>
                <Row fw>
                    <Button disabled icon="send">Primary</Button>
                    <Button secondary disabled icon="send">Secondary</Button>
                    <Button danger disabled icon="trash">Danger</Button>
                    <Button secondary danger disabled icon="trash"
                        >Secondary danger</Button
                    >
                </Row>
                <Row fw>
                    <Input
                        name="input"
                        fw
                        bind:value={simultype}
                        type="email"
                    />
                    <Button icon="send"></Button>
                </Row>
                <Row fw>
                    <Input name="input" fw invalid />
                    <Button icon="send">Senden</Button>
                </Row>
                <Row fw>
                    <Input name="input" fw disabled />
                    <Button icon="send" disabled></Button>
                </Row>
            </Column>
            <Column fw>
                <Row fw>
                    <Button href="#" icon="send">Primary</Button>
                    <Button href="#" secondary>Secondary</Button>
                    <Button href="#" danger icon="trash">Danger</Button>
                    <Button href="#" secondary danger icon="trash"
                        >Secondary danger</Button
                    >
                </Row>
                <Row fw>
                    <Button href="#" disabled icon="send">Primary</Button>
                    <Button href="#" secondary disabled icon="send"
                        >Secondary</Button
                    >
                    <Button href="#" danger disabled icon="trash">Danger</Button
                    >
                    <Button href="#" secondary danger disabled icon="trash"
                        >Secondary danger</Button
                    >
                </Row>
                <Row fw>
                    <Input name="input" fw bind:value={simultype} type="tel" />
                    <Input name="input" fw type="date" />
                    <Input name="input" fw type="url" />
                    <Button
                        href="#"
                        icon="send"
                        bind:loading
                        onclick={() =>
                            new Promise((res) => setTimeout(res, 1000))}
                    ></Button>
                </Row>
                <Row fw>
                    <Input name="input" fw invalid />
                    <Button href="#" icon="send" bind:loading>Senden</Button>
                </Row>
                <Row fw>
                    <Input name="input" fw disabled value={select} />
                    <Button href="#" icon="send" disabled></Button>
                </Row>
            </Column>
        </Row>
        <Row fw>
            <Spacer w="20dvw" />
            <Select
                fw
                name="select"
                bind:value={select}
                options={{
                    "opt-a": "Option A",
                    "opt-b": "Option B",
                    "opt-c": "Option C",
                }}
            />
            <Spacer w="20dvw" />
        </Row>
    </Center>
</div>

<style>
    .wrapper {
        padding: 10px;
        height: 100%;
    }
</style>
