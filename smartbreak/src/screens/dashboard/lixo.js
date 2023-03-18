<View style={styles.dashboardContent}>
            <View style={styles.rowContainer}>
              <View style={styles.columnContainerLeft}>
                <View style={styles.batteryValues}>
                  <View>
                    <Text style={styles.batteryValuesTitle}>
                      A sua carga pessoal
                    </Text>
                    <Text style={styles.batteryValuesCharge}>400 kWh</Text>
                  </View>
                  <View>
                    <Text style={styles.batteryValuesTitle}>
                      Objetivos por cumprir
                    </Text>
                    <Text style={styles.batteryValuesGoals}>4</Text>
                  </View>
                </View>
                <View style={styles.addPauseButtonContainer}>
                  <View style={styles.pauseCircle}>
                    <Play variant="Bold" color="#07407B" size={26} />
                  </View>
                  <View style={styles.buttonDashboardView}>
                    <Pressable
                      onPress={() => {
                        setModalVisible(true);
                      }}
                      style={styles.addPauseButton}
                    >
                      <Text style={styles.addPauseButtonText}>
                        {" "}
                        Iniciar pausa
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
              <View style={styles.columnContainerRight}>
                <View style={styles.batteryView}>
                  <View style={styles.batteryTip} />
                  <View style={styles.batteryContainer}>
                    <View style={[styles.batteryFill]} />
                    <View
                      style={[
                        styles.batteryFill,
                        {
                          backgroundColor: "transparent",
                          height: 10,
                          //FILL DINÂMICO ESTÁ TRANSPARENTE PARA DEPOIS SER REVISTO
                        },
                      ]}
                    />
                  </View>
                </View>
                <Happyemoji
                  style={styles.batteryEmoji}
                  size="40"
                  color="#FEFEFE"
                />
              </View>
            </View>
          </View>